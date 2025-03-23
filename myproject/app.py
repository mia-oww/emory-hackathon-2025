from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate 
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Roommate
from config import Config


app = Flask(__name__)
app.config.from_object(Config)#load config from Config class
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///roommates.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)#initializing db with app
migrate = Migrate(app, db)

CORS(app)# enable CORS for all routes
#so frontend (react) is able to make requests

@app.route('/')
def home():
    return "Roommate Matcher Backend is running!"


@app.route('/register', methods=['POST'])
def register():
    data= request.get_json()
    username= data.get('username')
    email= data.get('email')
    password= data.get('password')
    gender= data.get('gender')
    preferences= data.get('preferences')
    location= data.get('location')

    if Roommate.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400
    if Roommate.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered"}), 400
    
    new_roommate = Roommate(username=username, email=email, gender=gender, preferences=preferences, location=location)
    new_roommate.set_password(password)

    db.session.add(new_roommate)
    db.session.commit()

    return jsonify({"message": "Registration successful!"}), 201
                    

@app.route('/login', methods=['POST'])
def login():
    data= request.get_json()
    email= data.get('email')
    password= data.get('password')

    user= Roommate.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return jsonify({"message": "Login successful!"}), 200
    return jsonify({"message": "Invalid credentials"}), 401


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
    preferences = data.get('preferences') # INSTEAD OF PREFERENCES, QUESTIONNARE
    location = data.get('location')

    new_roommate = Roommate(name=name, gender=gender, preferences=preferences, location=location)

    db.session.add(new_roommate)
    db.session.commit()

    return jsonify({"message": "Roommate added successfully!"}), 201




if __name__ == '__main__':
    app.run(debug=True)




