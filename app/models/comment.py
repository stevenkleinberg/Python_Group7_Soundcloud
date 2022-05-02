from .db import db
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id"),nullable=False)
    song_id = db.Column(db.Integer,db.ForeignKey("songs.id"),nullable=False)
    song_timestamp = db.Column(db.Time)
    created_at = db.Column(db.DateTime, nullable=False,default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False,default=datetime.now())

    user = db.relationship("User",back_populates="comments")
    song = db.relationship("Song", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'song_id':self.song_id,
            'song_timestamp' : self.song_timestamp,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
