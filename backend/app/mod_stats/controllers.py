# Import flask dependencies
import json
from flask import Blueprint, request
from app import check_auth_token
from app.db.stats_model import BalanceDaily as balance_d, StatsPublisherCampaignDaily as spcd

mod_stats = Blueprint('stats', __name__, url_prefix='/stats')

# Import module models (i.e. User)
# from app.db.users_model import Admins as admins




# Set the route and accepted methods
@mod_stats.route('/dashboard/', methods=['GET'])
@check_auth_token
def get_dashboard_stats():
    return json.dumps({
        "daily": balance_d.fetch_daily_revenue(),
        "weekly": balance_d.fetch_weekly_revenue(),
        "campaign": spcd.fetch_campaign_stats(1)
    })

@mod_stats.route('/dashboard/campaigns', methods=['POST'])
@check_auth_token
def get_campaigns_stats():
    return json.dumps(spcd.fetch_campaign_stats(request.json['range']))


