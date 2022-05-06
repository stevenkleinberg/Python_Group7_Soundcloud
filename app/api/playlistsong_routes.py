from flask import Blueprint,request
from app.models import db , Song , Playlist
from sqlalchemy.orm import relationship, sessionmaker, joinedload

playlistsong_routes = Blueprint('playlistsong',__name__)

@playlistsong_routes.route('/', methods=['POST'])
def add_song_to_playlist():
    """
        Add a song to playlist
    """
    playlist_id = request.form["playlist_id"]
    song_id = request.form["song_id"]

    song = Song.query.get(int(song_id))
    playlist = Playlist.query.get(int(playlist_id))

    playlist.songs.append(song)

    db.session.commit()
    return playlist.to_dic()
