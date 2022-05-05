import json
import os
import random

from app.models import db, Playlist


def seed_playlists():
    f = open(os.getcwd()+"/app/seeds/playlists.json")

    data = json.load(f)

    for playlist_dict in data:
        new_playlist = Playlist(user_id=playlist_dict["user_id"], title=playlist_dict["title"],songs_order=playlist_dict["songs_order"],image_url=playlist_dict["image_url"],description=playlist_dict["description"])
        db.session.add(new_playlist)

    db.session.commit()

    f.close()


def undo_playlists():
    db.session.execute('TRUNCATE playlists RESTART IDENTITY CASCADE;')
    db.session.commit()
