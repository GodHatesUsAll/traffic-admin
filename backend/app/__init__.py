# Import flask and template operators
import smtplib
from email.header import Header

import jwt
import json
import config
import flask_cors

from flask import Flask, request, Response
from functools import wraps
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

# Define the WSGI application object
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configurations
app.config.from_object('config')
engine = create_engine(config.SQLALCHEMY_DATABASE_URI, echo=True, pool_pre_ping=True)
flask_cors.CORS(app, supports_credentials=True)
session = sessionmaker(bind=engine)


def make_response(data: object):
    response = Response(json.dumps(data))

    response.headers['Content-Type'] = "application/json"
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.mimetype = "application/json"

    return response


def check_auth_token(f):
    @wraps(f)
    def decorated(*args, **kws):
        if not 'Authorization' in request.headers:
            return json.dumps({
                "success": False,
                "error": {
                    "errors": [
                        {
                            "reason": "required",
                            "message": "Login Required",
                            "location": "Authorization"
                        }
                    ],
                    "code": 401,
                    "message": "Login Required"
                }
            })

        data = request.headers['Authorization'].encode('ascii', 'ignore')
        token = str.replace(str(data.decode('utf-8')), 'Bearer ', '')

        try:
            user = jwt.decode(token, config.SECRET_KEY, algorithms=['HS256'])['sub']
        except jwt.ExpiredSignatureError:
            return json.dumps({
                "success": False,
                "error": {
                },
                "code": 401,
                "message": 'Signature expired. Please log in again.'
            })
        except jwt.InvalidTokenError:
            return json.dumps({
                "success": False,
                "error": {
                },
                "code": 401,
                "message": 'Invalid token. Please log in again.'
            })

        return f(*args, **kws)

    return decorated


def send_signup_email(address, hash):
    fromaddr = 'nv.reborn.test@gmail.com'
    toaddr = address
    msg = MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = toaddr
    msg['Subject'] = Header("Auth", 'utf-8')

    body = "http://localhost:5000/activate/{}".format(hash)
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.ehlo()
        server.starttls()
        server.login(fromaddr, "polosa123456789")
        text = msg.as_string()
        server.sendmail(fromaddr, toaddr, text)
        server.quit()
        return make_response({"success": True})
    except smtplib.SMTPException:
        return make_response({"success": False})
