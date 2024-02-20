"""empty message

Revision ID: 030464fc2d22
Revises: 9434003cee4c
Create Date: 2024-02-19 09:00:59.790055

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '030464fc2d22'
down_revision = '9434003cee4c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('last_name', sa.String(length=25), nullable=False))
        batch_op.drop_column('_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_name', sa.VARCHAR(length=25), nullable=False))
        batch_op.drop_column('last_name')

    # ### end Alembic commands ###