"""userdetailsFix

Revision ID: 92e235ab2866
Revises: b19cfb250c23
Create Date: 2022-05-05 11:58:36.363369

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '92e235ab2866'
down_revision = 'b19cfb250c23'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userDetails',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('display_name', sa.String(length=50), nullable=True),
    sa.Column('avatar_url', sa.String(), nullable=True),
    sa.Column('banner_url', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('userDetail')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userDetail',
    sa.Column('id', sa.INTEGER(), server_default=sa.text('nextval(\'"userDetail_id_seq"\'::regclass)'), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('display_name', sa.VARCHAR(length=50), autoincrement=False, nullable=True),
    sa.Column('avatar_url', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('banner_url', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='userDetail_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='userDetail_pkey')
    )
    op.drop_table('userDetails')
    # ### end Alembic commands ###
