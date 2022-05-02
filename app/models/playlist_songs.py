from .db import db

playlist_songs = db.Table(
    "playlistSongs",
    db.Column(
        "playlist_id", db.Integer, db.ForeignKey("playlists.id"), primary_key=True
    ),
    db.Column(
        "song_id", db.Integer, db.ForeignKey("songs.id"), primary_key=True
    )
)
