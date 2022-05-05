from app.models import db, UserDetail


# Adds a demo user, you can add other users here if you want
def seed_user_details():
    demo = UserDetail(
        id=1,
        user_id='1',
        display_name='Demo user'
    )
    marnie = UserDetail(
        id=2,
        user_id=2,
        display_name='Marnie Bernard'
    )
    bobbie = UserDetail(
        id=3,
        user_id=3,
        display_name='Bobby Bernard'
    )

    db.session.add(dict(demo))
    db.session.add(dict(marnie))
    db.session.add(dict(bobbie))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_user_details():
    db.session.execute('TRUNCATE usersDetails RESTART IDENTITY CASCADE;')
    db.session.commit()
