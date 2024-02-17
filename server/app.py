from flask import Flask, request, session
from flask_restful import Resource, Api
from config import app, db, api
from models import *  
import ipdb
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')

        if user_id:
            user = User.query.get(user_id)
            return user.to_dict(), 200

        return {}, 401

class Signup(Resource):
    def post(self):
        request_json = request.get_json()

        first_name = request_json.get('first_name')
        last_name = request_json.get('last_name')
        username = request_json.get('username')
        password = request_json.get('password')
        email = request_json.get('email')

        name = f"{first_name} {last_name}"

        user = User(name=name, username=username, email=email)
        user.password_hash = password

        db.session.add(user)
        db.session.commit()

        session['user_id'] = user.id

        return user.to_dict(), 200
    
class Login(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return False, 204


api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
