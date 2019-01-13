import json
from sqlalchemy.ext.declarative import declarative_base
from app import session
from sqlalchemy import Column, String, Integer, func, inspect, Boolean
from datetime import datetime
from app.db import date_format, get_target_midnight

Base = declarative_base()


class Campaign(Base):
    __tablename__ = 'campaign'

    campaign_id = Column(Integer, primary_key=True)
    publisher_id = Column(Integer)
    name = Column(String)
    archived = Column(Boolean)
    sample_sid = Column(String)
    sample_pid = Column(String)
    sample_cid = Column(String)
    sample_s1 = Column(String)
    sample_s2 = Column(String)
    sample_s3 = Column(String)
    postback = Column(String)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

