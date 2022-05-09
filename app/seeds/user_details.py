from app.models import db, UserDetail


# Adds a demo user, you can add other users here if you want
def seed_user_details():

    demo = UserDetail(
        user_id=1,
        display_name='Demo user',
        avatar_url='https://avatarfiles.alphacoders.com/194/thumb-194221.jpg',
        banner_url='https://i.ytimg.com/vi/zob-2dpRtH0/maxresdefault.jpg'
    )
    marnie = UserDetail(
        user_id=2,
        display_name='Marnie Bernard',
        avatar_url='https://avatarfiles.alphacoders.com/194/thumb-194221.jpg',
        banner_url='https://i.ytimg.com/vi/zob-2dpRtH0/maxresdefault.jpg'
    )
    bobbie = UserDetail(
        user_id=3,
        display_name='Bobby Bernard',
        avatar_url='https://avatarfiles.alphacoders.com/194/thumb-194221.jpg',
        banner_url='https://i.ytimg.com/vi/zob-2dpRtH0/maxresdefault.jpg'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_user_details():
    db.session.execute('TRUNCATE "userDetails" RESTART IDENTITY CASCADE;')
    db.session.commit()
