# Import flask dependencies
from flask import Blueprint, Response
import json
from app import check_auth_token, make_response

mod_users = Blueprint('users', __name__, url_prefix='/users')

# Import module models (i.e. User)
from app.db.users_model import Admins as admins


# Set the route and accepted methods
@mod_users.route('/admins/', methods=['GET'])
@check_auth_token
def get_admins_list():
    return make_response(admins.get_admins())

    # return Response(json.dumps([ row.json() for row in users ]),  mimetype='application/json')


@mod_users.route('/admins/<int:admin_id>', methods=['GET'])
@check_auth_token
def get_admin_by_id(admin_id):
    return make_response(admins.get_admin(admin_id))
