from .db import db


song_likes = db.Table(
    "songsLikes",
    db.Column(
        "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        "song_id", db.Integer, db.ForeignKey("songs.id"), primary_key=True
    )
)
