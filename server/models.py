from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Date

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    location = db.Column(db.String(200), nullable=False)

    guests = db.relationship('Guest', back_populates='event', cascade='all, delete-orphan')

    serialize_rules = ('-guests.event',)

    def __repr__(self):
        return f'<Event id={self.id} title={self.title} date={self.date} time={self.time} location={self.location}>'

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    tasks = db.relationship('Task', back_populates='assignee', cascade='all, delete-orphan')
    events = db.relationship('Guest', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = ('-tasks.assignee', '-events.user')

    def __repr__(self):
        return f'<User id={self.id} username={self.username} email={self.email}>'

class Invitation(db.Model, SerializerMixin):
    __tablename__ = 'invitations'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False)  

    event = db.relationship('Event', back_populates='guests')
    user = db.relationship('User', back_populates='events')

    serialize_rules = ('-event.guests', '-user.events')

    def __repr__(self):
        return f'<Guest id={self.id} event_id={self.event_id} user_id={self.user_id} status={self.status}>'

class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    assigned_to = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    event = db.relationship('Event', back_populates='tasks')
    assignee = db.relationship('User', back_populates='tasks')

    serialize_rules = ('-event.tasks', '-assignee.tasks')

    def __repr__(self):
        return f'<Task id={self.id} description={self.description} due_date={self.due_date} ' \
               f'completed={self.completed} event_id={self.event_id} assigned_to={self.assigned_to}>'
