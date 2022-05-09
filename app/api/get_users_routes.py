from flask import Blueprint, jsonify, request
from app.models import User, db


users_routes_1 = Blueprint('getusers', __name__)

@users_routes_1.route('/')
def get_users():
    """
    Get Users
    """
    print("testingefsnijenfisjnfisjenfisojnfosjnfso")
    users = User.query.all()
    print([user.to_dict() for user in users ],"++++++++++")
    return jsonify([user.to_dict() for user in users ])
