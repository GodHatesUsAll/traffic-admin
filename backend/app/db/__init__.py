# from app.db.db_worker import DBWorker
#
# db = DBWorker()
import time
from datetime import datetime, timedelta

__current_milli_time = lambda: int(time.time())
__min = 60
__hour = 3600
__day = 86400
__price_devider = 100000
date_format = '%Y-%m-%d %H:%M:%S'


# row2dict = lambda r: {c.name: str(getattr(r, c.name)) for c in r.__table__.columns}

def get_target_midnight(days_range: int):
    date = datetime.now() - timedelta(days=days_range)
    return date.replace(hour=0, minute=0, second=0)


def format_price(price: int):
    return float('{:.2f}'.format(price / __price_devider))
