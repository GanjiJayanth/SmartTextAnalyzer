from flask import Flask
from flask_cors import CORS
import os
import bcrypt

from routestxt.auth_routes import  register, login
from routestxt.health_routes import  not_found, internal_error



app = Flask(__name__)
CORS(app)

app.add_url_rule('/register', 'register', register, methods=['POST'])
app.add_url_rule('/login', 'login', login, methods=['POST'])



if __name__ == "__main__":
    port = int(os.getenv('PORT', 4000))
    debug = os.getenv('DEBUG', 'True').lower() == 'true'
    app.run(debug=debug, port=port)
