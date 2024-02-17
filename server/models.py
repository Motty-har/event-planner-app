from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Date
from sqlalchemy.ext.associationproxy import association_proxy

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    serialize_rules = ('-invitations.event',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    location = db.Column(db.String(200), nullable=False)

    invitations = db.relationship('Invitation', back_populates='event')

    def __repr__(self):
        return f'<Event id={self.id} title={self.title} date={self.date} time={self.time} location={self.location}>'

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-invitations.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)

    invitations = db.relationship('Invitation', back_populates='user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User id={self.id} username={self.username} email={self.email}>'

class Invitation(db.Model, SerializerMixin):
    __tablename__ = 'invitations'

    serialize_rules = ('-event.invitations', '-user.invitations')

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False)  

    event = db.relationship('Event', back_populates='invitations')
    user = db.relationship('User', back_populates='invitations')

    def __repr__(self):
        return f'<Invitation id={self.id} event_id={self.event_id} user_id={self.user_id} status={self.status}>'
    
class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    assigned_to = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    def __repr__(self):
        return f'<Task id={self.id} description={self.description} due_date={self.due_date} ' \
            f'completed={self.completed} event_id={self.event_id} assigned_to={self.assigned_to}>'