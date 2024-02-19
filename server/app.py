from flask import Flask, request, session
from flask_restful import Resource, Api
from config import app, db, api
from models import * 
from datetime import datetime
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

        first_name = request_json.get('firstName')
        last_name = request_json.get('lastName')
        username = request_json.get('username')
        password = request_json.get('password')
        email = request_json.get('email')
       
        name = f"{first_name} {last_name}"

        user = User(first_name=first_name, last_name=last_name, username=username, email=email)
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

class CreateEvent(Resource):
    def post(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'error': '401 Unauthorized'}, 401

        event_data = request.get_json()

        title = event_data.get('title')
        description = event_data.get('description')
        date_str = event_data.get('date')
        time_str = event_data.get('time')
        location = event_data.get('location')

        date = datetime.strptime(date_str, '%Y-%m-%d').date()
        time = datetime.strptime(time_str, '%H:%M').time()

        event = Event(title=title, description=description, date=date, time=time, location=location)
        db.session.add(event)
        db.session.commit()

        return event.to_dict(), 200
    
class Users(Resource):
    def get(self):

        users = User.query.order_by(User.last_name).all()

        return [user.to_dict() for user in users], 200

class Invitations(Resource):
    def post(self):
        data = request.get_json()
        invitees = data.get('selected_users')
        event_id = data.get('event_id')
        
        for user in invitees:
            invitation = Invitation(
                event_id=event_id,
                user_id=user,
                status='pending'
            )
            db.session.add(invitation)
        
        db.session.commit()

        return { 'Success': True }, 200
        
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CreateEvent, '/create-event')
api.add_resource(Users, '/users')
api.add_resource(Invitations, '/invitations')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
