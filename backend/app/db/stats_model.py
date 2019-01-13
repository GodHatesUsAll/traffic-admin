from sqlalchemy.ext.declarative import declarative_base
from app import session
from sqlalchemy import Column, String, Integer, ForeignKey, func, inspect, DateTime, BIGINT
from sqlalchemy.dialects import mysql
from datetime import datetime, timedelta

from app.db import date_format, get_target_midnight, format_price
from app.db.campaign_model import Campaign
from app.db.users_model import Publishers

Base = declarative_base()


class BalanceDaily(Base):
    __tablename__ = 'balance_daily'

    bucket = Column(DateTime, primary_key=True)
    subject_type = Column(mysql.ENUM('publisher', 'advertiser'), primary_key=True)
    subject_id = Column(Integer, primary_key=True)
    debit = Column(mysql.BIGINT)
    credit = Column(mysql.BIGINT)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    @staticmethod
    def fetch_daily_revenue():
        end = datetime.now().replace(hour=23, minute=59, second=59).strftime(date_format)
        start = get_target_midnight(70).strftime(date_format)

        db = session()
        data = db.query(func.sum(BalanceDaily.credit).label('credit'), BalanceDaily.bucket.label('bucket')) \
            .filter((BalanceDaily.bucket >= start) &
                    (BalanceDaily.bucket <= end) & (BalanceDaily.subject_type == "advertiser")) \
            .group_by(BalanceDaily.bucket) \
            .all()
        db.close()

        credits_data = []
        for d in data:
            credits_data.append({"revenue": format_price(int(d.credit)), "month": d.bucket.strftime('%a %d')})

        return credits_data

    @staticmethod
    def fetch_weekly_revenue():
        end = datetime.now().replace(hour=23, minute=59, second=59).strftime(date_format)
        start = get_target_midnight(70).strftime(date_format)

        db = session()
        data = db.query(func.sum(BalanceDaily.credit).label('credit'), BalanceDaily.bucket.label('bucket')) \
            .filter((BalanceDaily.bucket >= start) &
                    (BalanceDaily.bucket <= end) &
                    (BalanceDaily.subject_type == "advertiser")).group_by(BalanceDaily.bucket).all()
        db.close()

        weekly_data = []
        for d in data:
            weekly_data.append({"revenue": format_price(int(d.credit)), "date": d.bucket.strftime('%x')})

        return weekly_data


class StatsPublisherCampaignDaily(Base):
    __tablename__ = 'stats_publisher_campaign_daily'

    date = Column(DateTime, primary_key=True)
    publisher_id = Column(Integer, primary_key=True)
    campaign_id = Column(Integer, primary_key=True)
    visits = Column(BIGINT)
    clicks = Column(BIGINT)
    leads = Column(BIGINT)
    revenue = Column(BIGINT)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    @staticmethod
    def fetch_campaign_stats(days_range: int):
        if days_range == 1:
            date = {
                "start": datetime.now().replace(hour=0, minute=0, second=0).strftime(date_format),
                "end": datetime.now().replace(hour=23, minute=59, second=59).strftime(date_format)
            }
        elif days_range == 2:
            date = {
                "start": (datetime.now() - timedelta(days=1)).replace(hour=0, minute=0, second=0).strftime(date_format),
                "end": (datetime.now() - timedelta(days=1)).replace(hour=23, minute=59, second=59).strftime(date_format)
            }
        else:
            date = {
                "start": (datetime.now() - timedelta(days=days_range)).replace(hour=0, minute=0, second=0).strftime(
                    date_format),
                "end": datetime.now().replace(hour=23, minute=59, second=59).strftime(date_format)
            }

        db = session()
        rows = db.query(
            func.sum(StatsPublisherCampaignDaily.visits).label('visits'),
            func.sum(StatsPublisherCampaignDaily.clicks).label('clicks'),
            func.sum(StatsPublisherCampaignDaily.leads).label('leads'),
            func.sum(StatsPublisherCampaignDaily.revenue).label('revenue'),
            StatsPublisherCampaignDaily.publisher_id.label('publisher_id'),
            Campaign.campaign_id.label('campaign_id'),
            Campaign.name.label('name'),
        ).join(Publishers, Publishers.publisher_id == StatsPublisherCampaignDaily.publisher_id) \
            .join(Campaign, Campaign.publisher_id == StatsPublisherCampaignDaily.publisher_id, isouter=True) \
            .filter((StatsPublisherCampaignDaily.date >= date["start"]) &
                    (StatsPublisherCampaignDaily.date <= date["end"])) \
            .group_by(Campaign.campaign_id).all()

        data = []

        for row in rows:
            revenue = format_price(int(row.revenue))
            data.append({
                "visits": int(row.visits),
                "clicks": int(row.clicks),
                "leads": int(row.leads),
                "revenue": revenue,
                "cvr": float('{:.2f}'.format(int(row.leads) / int(row.clicks) if int(row.clicks) > 0 else 0.00)),
                "epc": float('{:.5f}'.format(int(revenue) / int(row.clicks) if int(row.clicks) > 0 else 0.00000)),
                "ecpm": format_price(((revenue * 1000) / int(row.visits) if int(row.visits) > 0 else 0.00)),
                "publisher_id": row.publisher_id,
                "campaign_id": row.campaign_id,
                "name": row.name,
            })

        return data
