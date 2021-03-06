"""empty message

Revision ID: b19cfb250c23
Revises: 55e5a0586983
Create Date: 2022-05-05 02:32:39.038242

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b19cfb250c23'
down_revision = '55e5a0586983'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userDetail',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('display_name', sa.String(length=50), nullable=True),
    sa.Column('avatar_url', sa.String(), nullable=True),
    sa.Column('banner_url', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('userDetails')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userDetails',
    sa.Column('id', sa.INTEGER(), server_default=sa.text('nextval(\'"userDetails_id_seq"\'::regclass)'), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('display_name', sa.VARCHAR(length=50), autoincrement=False, nullable=True),
    sa.Column('avatar_url', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('banner_url', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='userDetails_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='userDetails_pkey')
    )
    op.drop_table('userDetail')
    # ### end Alembic commands ###
