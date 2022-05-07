from flask import Blueprint, jsonify, request
from app.models import db, Song, User
from datetime import datetime
from sqlalchemy.orm import relationship, sessionmaker, joinedload

like_routes = Blueprint('like', __name__)


@like_routes.route('/song/', methods=['POST'])
def like_song():
    """
        Create a New like on a song
    """
    user_id = request.form["user_id"]
    song_id = request.form["song_id"]

    song = Song.query.get(int(song_id))
    user = User.query.get(int(user_id))

    song.likes.append(user)

    db.session.commit()
    return song.to_dict()


@like_routes.route('/song/', methods=['DELETE'])
def unlike_song():
    """
        Create a New like on a song
    """

    user_id = request.form["user_id"]
    song_id = request.form["song_id"]

    song = Song.query.get(int(song_id))
    user = User.query.get(int(user_id))

    song.likes = [like for like in song.likes if user.id != like.id]
    db.session.commit()
    return song.to_dict()
