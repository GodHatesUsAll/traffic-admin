import datetime
import jwt
from sqlalchemy import Column, DateTime, String, Integer, ForeignKey, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import inspect
from app import session
import bcrypt

from config import SECRET_KEY

Base = declarative_base()


class Admins(Base):
    __tablename__ = 'admin'

    admin_id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)

    def __init__(self, email, password):
        self.email = email
        self.password = password

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    @staticmethod
    def get_admins():
        db = session()
        admins = db.query(Admins).all()
        db.close()

        admins_arr = []
        for admin in admins:
            admins_arr.append(admin.to_dict())

        return admins_arr

    @staticmethod
    def get_admin(admin_id):
        db = session()
        admin = db.query(Admins).filter(Admins.admin_id == admin_id).one_or_none()

        if admin is not None:
            admin = admin.to_dict()
        else:
            admin = {}

        db.close()

        return admin

    @staticmethod
    def login_admin(email, password):
        db = session()
        admin = db.query(Admins).filter(Admins.email == email).one_or_none()

        if admin is not None:
            admin = admin.to_dict()

            if bcrypt.checkpw(password.encode('utf8'), admin['password'].encode('utf8')):
                payload = {
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=600),
                    'iat': datetime.datetime.utcnow(),
                    'sub': admin['admin_id']
                }
                data = {
                    "success": True,
                    "error": {},
                    "code": 200,
                    "message": "Login Success",
                    'token': jwt.encode(payload, SECRET_KEY, algorithm='HS256').decode('utf-8')
                }
            else:
                data = {
                    "success": False,
                    "error": {
                        "errors": [
                            {
                                "reason": "invalid credentials",
                                "location": "Authorization"
                            }
                        ],
                    },
                    "code": 401,
                    "message": "Login failed. Invalid Email or Password",
                    "token": None
                }
        else:
            data = {
                "success": False,
                "error": {
                    "errors": [
                        {
                            "reason": "User not found",
                            "location": "Authorization"
                        }
                    ],
                    "code": 401,
                },
                "code": 401,
                "message": "Login failed. User not found",
                "token": None
            }
        return data


class Publishers(Base):
    __tablename__ = 'publisher'

    publisher_id = Column(Integer, primary_key=True)
    email = Column(String)
    name = Column(String)
    password = Column(String)

    def __init__(self, email, password):
        self.email = email
        self.password = password

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    @staticmethod
    def get_publishers():
        db = session()
        publishers = db.query(Publishers).all()
        db.close()

        publishers_arr = []
        for publisher in publishers:
            publishers_arr.append(publisher.to_dict())

        return publishers_arr

    @staticmethod
    def get_publisher(publisher_id):
        db = session()
        publisher = db.query(Admins).filter(Publishers.publisher_id == publisher_id).one_or_none()

        if publisher is not None:
            publisher = publisher.to_dict()
        else:
            publisher = {}

        db.close()

        return publisher
