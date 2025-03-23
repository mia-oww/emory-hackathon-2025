from flask import Blueprint, request, jsonify
from models import db, Roommate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)  # Create Blueprint for authentication

# User Registration
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    gender = data.get('gender')

    # check if email exists
    if Roommate.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered"}), 400

    #hash pw before saving
    hashed_password = generate_password_hash(password)

    new_user = Roommate(email=email, password_hash=hashed_password, gender=gender,)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Registration successful!"}), 201

# user login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = Roommate.query.filter_by(email=email).first()
    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=user.id)  # Generate JWT token
        return jsonify({"message": "Login successful!", "token": access_token}), 200

    return jsonify({"message": "Invalid credentials"}), 401

# Protected Route (Example: Only Logged-in Users Can Access)
@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    return jsonify({"message": f"Welcome User {user_id}!"}), 200
