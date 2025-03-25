from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()#intializing db object

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

def set_password(self, password):
    self.password_hash = generate_password_hash(password)
#hash password before saving to database

def check_password(self, password):
    return check_password_hash(self.password_hash, password)
#check if provided pw matches stored hash pw

def __repr__(self):
        return f"<User {self.username}>"

class Roommate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String (15), nullable=False) # FOR MALE OR FEMALE

    def __repr__(self):
        return f"<Roommate {self.name}>"



