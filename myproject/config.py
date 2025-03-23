from dotenv import load_dotenv
import os

load_dotenv()


class Config:
    SECRET_KEY = os.urandom(24)#random secret key for sessions
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite'#ex for sqlite
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    #load email and password for environment variables for added security
    MAIL_USERNAME = os.getenv("MAIL_USERNAME", "default_email@example.com")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "default_password")



