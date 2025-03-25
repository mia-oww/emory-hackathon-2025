from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate 
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Roommate
from config import Config
from flask_jwt_extended import create_access_token, JWTManager


app = Flask(__name__)
app.config.from_object(Config)#load config from Config class
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///roommates.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '/////'
jwt = JWTManager(app)

db.init_app(app)#initializing db with app
migrate = Migrate(app, db)

CORS(app)# enable CORS for all routes
#so frontend (react) is able to make requests

@app.route('/')
def home():
    return "Roommate Matcher Backend is running!"


# FOR REGISTER FUNCTION
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if Roommate.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered"}), 400
    
    new_roommate = Roommate(email=email, password=password)
    new_roommate.set_password(password)

    db.session.add(new_roommate)
    db.session.commit()

    return jsonify({"message": "Registration successful!"}), 201

# FOR LOGIN FUNCTION
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = Roommate.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)  # Generate JWT
        return jsonify({"message": "Login successful!", "token": access_token}), 200

    return jsonify({"message": "Invalid credentials"}), 401


from flask_jwt_extended import jwt_required, get_jwt_identity


@app.route('/userlogged', methods=['GET']) #NO RISK
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()  #grabs the logged in user ID
    return jsonify({"message": f"Hello User {current_user_id}!"}), 200



@app.route('/gender', methods=['POST'])
def gender():
    data = request.get_json()
    gender = data.get('gender')#gets gender from user input

    if gender not in ['male', 'female', 'other']:
        return jsonify({"message": "Invalid gender option."})

    current_user_id = get_jwt_identity()
    user = Roommate.query.get(current_user_id)

    if user:
        user.gender = gender.session.commit()
        return jsonify({"message": "Gender updated successfully!"}), 200
    else:
        return jsonify({"message": "USER NOT FOUND"}), 404


# DO NOT LOOK BELOW THIS LINE -----


@app.route('/get_roommates', methods=['GET'])
def get_roommates():
    roommates = Roommate.query.all()
    result = [{"id": r.id, "name": r.name, "preferences": r.preferences, "location": r.location} for r in roommates]
    return jsonify(result), 200


@app.route('/get_roommate/<name>', methods=['GET'])
def get_roommate(name):
    roommate = Roommate.query.filter_by(name=name).first()
    if roommate:
        return jsonify({
            "id": roommate.id,
            "name": roommate.name,
            "gender": roommate.gender,
            "preferences": roommate.preferences,
            "location": roommate.location
        }), 200
    return jsonify({"message": "Roommate not found"}), 404


@app.route('/add_roommate', methods=['POST'])
def add_roommate():
    data = request.get_json()
    name = data.get('name')
    gender = data.get('gender') #new gender things 

    new_roommate = Roommate(name=name, gender=gender,)

    db.session.add(new_roommate)
    db.session.commit()

    return jsonify({"message": "Roommate added successfully!"}), 201



if __name__ == '__main__':
    app.run(debug=True)




