import json
import os
import random

from app.models import db, Playlist, Song


def seed_playlist_songs():
    f = open(os.getcwd()+"/app/seeds/playlistSongs.json")

    data = json.load(f)

    for playlist_song_dict in data:
        song = Song.query.get(playlist_song_dict["song_id"])
        playlist = Playlist.query.get(playlist_song_dict["playlist_id"])
        playlist.songs.append(song)


    db.session.commit()

    f.close()


def undo_playlist_songs():
    db.session.execute('TRUNCATE "playlistSongs" RESTART IDENTITY CASCADE;')
    db.session.commit()
