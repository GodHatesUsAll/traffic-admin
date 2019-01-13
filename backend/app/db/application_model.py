import random
from sqlalchemy import Column, DateTime, String, Integer, ForeignKey, func
from sqlalchemy.dialects import mysql
from sqlalchemy.ext.declarative import declarative_base
from app import session

Base = declarative_base()


class Application(Base):
    __tablename__ = 'application'

    application_id = Column(Integer, primary_key=True)
    email = Column(String)
    hash = Column(String)
    status = Column(mysql.ENUM('verify_email', 'pending', 'approved', 'rejected'))

    def __init__(self, email):
        self.email = email
        self.hash = random.getrandbits(128)
        self.status = 'verify_email'

    def __repr__(self):
        return "<Application (hash='%s', email='%s'')>" % (self.hash, self.email)

    @staticmethod
    def check_exists(email):
        db = session()
        data = db.query(Application.email).filter(Application.email == email).all()
        if len(data) > 0:
            return True
        else:
            return False
