from app import app

# Import a module / component using its blueprint handler variable (mod_auth)
from app.mod_auth.controllers import mod_auth as auth_module
from app.mod_users.controllers import mod_users as users_module
from app.mod_stats.controllers import mod_stats as stats

# Register blueprint(s)
app.register_blueprint(auth_module)
app.register_blueprint(users_module)
app.register_blueprint(stats)
# app.register_blueprint(xyz_module)
# ..

app.run(host='0.0.0.0', port=5000, debug=True)
