from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .song_like import song_likes
from .playlist_like import playlist_likes
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user_detail = db.relationship(
        "UserDetail", back_populates="user", uselist=False)
    songs = db.relationship("Song", back_populates="user")
    playlists = db.relationship("Playlist", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")

    pl_likes = db.relationship(
        "Playlist",
        secondary=playlist_likes,
        back_populates="pl_likes"
    )

    likes = db.relationship(
        "Song",
        secondary=song_likes,
        back_populates="likes"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            "user_detail":self.user_detail.to_dict()
        }
