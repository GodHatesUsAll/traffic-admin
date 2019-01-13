# Import flask dependencies
from flask import Blueprint, request

from app import session, send_signup_email
from app.db.application_model import Application
from app.db.users_model import Admins as admins
import json

# Define the blueprint: 'auth', set its url prefix: app.url/auth
mod_auth = Blueprint('auth', __name__, url_prefix='/auth')


# Set the route and accepted methods
@mod_auth.route('/login/', methods=['POST'])
def signin():
    data = request.json['form']
    return json.dumps(admins.login_admin(data['email'], data['password']))


@mod_auth.route('/signup/', methods=['POST'])
def signup():
    email = request.json['email']
    if not Application.check_exists(email):
        db = session()
        new_application = Application(email)
        db.add(new_application)
        hashed = new_application.hash
        db.commit()
        db.close()

        if send_signup_email(email, hashed):
            return json.dumps({
                "success": True,
                "message": "Message was sent to email you provided. Please check an email"
            })
        else:
            return json.dumps({
                "success": False,
                "message": "Email was not sent :( Please contact us"
            })
    else:
        return json.dumps({
            "success": False,
            "message": "Email already exists. Wait for next email with credentials"
        })
