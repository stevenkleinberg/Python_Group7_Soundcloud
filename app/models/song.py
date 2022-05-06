from .db import db
from datetime import datetime
from .song_like import song_likes
from .playlist_songs import playlist_songs


class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(75), nullable=False)
    audio_url = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="songs")
    comments = db.relationship("Comment", back_populates="song")

    likes = db.relationship(
        "User",
        secondary=song_likes,
        back_populates="likes"
    )

    playlists = db.relationship(
        "Playlist",
        secondary=playlist_songs,
        back_populates="songs"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'audio_url': self.audio_url,
            'description': self.description,
            'image_url': self.image_url,
            'comments': [comment.to_dict() for comment in self.comments],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
