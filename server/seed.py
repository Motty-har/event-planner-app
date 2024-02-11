from random import randint, choice
from datetime import datetime, timedelta

from faker import Faker

from app import app
from models import Event, User, Invitation, Task, db
from events import events 

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        db.drop_all()
        db.create_all()

        for event_data in events:
            new_event = Event(
                title=event_data['title'],
                description=event_data['description'],
                date=datetime.strptime(event_data['date'], "%Y-%m-%d").date(),
                time=datetime.strptime(event_data['time'], "%H:%M").time(),
                location=event_data['location']
            )

            db.session.add(new_event)

        db.session.commit()

        users = []

        for i in range(20):
            first_name = fake.first_name()
            last_name = fake.last_name()
            random_number_1 = randint(10, 99)

            username = f"{first_name.lower()}{last_name.lower()}{random_number_1}"
            name = f"{first_name} {last_name}"
            email = f"{username}@mail.com"

            user = User(
                username=username,
                name=name,
                email=email,
            )
            user.password_hash = user.username + 'password'

            users.append(user)

        for user in users:
            db.session.add(user)

        db.session.commit()

        invitations = []

        for event in Event.query.all():
            for user in User.query.all():
                status = choice(['accepted', 'declined', 'pending'])
                invitation = Invitation(
                    event_id=event.id,
                    user_id=user.id,
                    status=status
                )
                invitations.append(invitation)

        db.session.add_all(invitations)
        db.session.commit()

        tasks = []

        for event in Event.query.all():
            for user in User.query.all():
                description = f"Task for {event.title}"
                due_date = event.date - timedelta(days=randint(1, 30))
                completed = choice([True, False])
                task = Task(
                    description=description,
                    due_date=due_date,
                    completed=completed,
                    event_id=event.id,
                    assigned_to=user.id
                )
                tasks.append(task)

        db.session.add_all(tasks)
        db.session.commit()

        print("Seed data generated successfully.")
