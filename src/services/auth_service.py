from models import db
from models.user import User
from flask_jwt_extended import create_access_token

class AuthService:
    @staticmethod
    def register_user(name, email, password):
        if User.query.filter_by(email=email).first():
            return None, "Email already exists"
        
        user = User(name=name, email=email)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        access_token = create_access_token(identity=user.id)
        return {'user': user, 'token': access_token}, None
    
    @staticmethod
    def login_user(email, password):
        user = User.query.filter_by(email=email).first()
        
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id)
            return {'user': user, 'token': access_token}, None
        
        return None, "Invalid credentials"
    
    @staticmethod
    def update_user_profile(user_id, **kwargs):
        user = User.query.get(user_id)
        if not user:
            return None, "User not found"
        
        for key, value in kwargs.items():
            if hasattr(user, key):
                setattr(user, key, value)
        
        db.session.commit()
        return user, None