"""empty message

Revision ID: 3077a06da304
Revises: 
Create Date: 2024-02-22 17:35:12.622179

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3077a06da304'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('first_name', sa.String(length=25), nullable=False),
    sa.Column('last_name', sa.String(length=25), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('_password_hash', sa.String(length=128), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('time', sa.Time(), nullable=False),
    sa.Column('location', sa.String(length=200), nullable=False),
    sa.Column('host_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['host_id'], ['users.id'], name=op.f('fk_events_host_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('invitations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], name=op.f('fk_invitations_event_id_events')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_invitations_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('due_date', sa.Date(), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('assigned_to', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['assigned_to'], ['users.id'], name=op.f('fk_tasks_assigned_to_users')),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], name=op.f('fk_tasks_event_id_events')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    op.drop_table('invitations')
    op.drop_table('events')
    op.drop_table('users')
    # ### end Alembic commands ###