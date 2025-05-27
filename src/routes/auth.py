from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.auth_service import AuthService
from models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    result, error = AuthService.register_user(
        data['name'], 
        data['email'], 
        data['password']
    )
    
    if error:
        return jsonify({'error': error}), 400
    
    return jsonify({
        'message': 'User created successfully',
        'access_token': result['token'],
        'user': result['user'].to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    result, error = AuthService.login_user(data['email'], data['password'])
    
    if error:
        return jsonify({'error': error}), 401
    
    return jsonify({
        'access_token': result['token'],
        'user': result['user'].to_dict()
    })

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.to_dict())

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    user, error = AuthService.update_user_profile(user_id, **data)
    if error:
        return jsonify({'error': error}), 404
    
    return jsonify(user.to_dict())


@auth_bp.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Auth route working'})