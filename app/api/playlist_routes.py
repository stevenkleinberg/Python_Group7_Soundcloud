from flask import Blueprint,jsonify,request
from app.models import Playlist, db,Song
from datetime import datetime
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

playlist_routes = Blueprint('playlist',__name__)

@playlist_routes.route("/", methods=["POST","PUT"])
def new_playlist():
    if request.method == 'POST':
        """
        Create a New Playlist
        """
        raw_image_url = request.files["image_url"]

        if not allowed_file(raw_image_url.filename):
            return {"errors": "file type not permitted"}, 400

        raw_image_url.filename = get_unique_filename(raw_image_url.filename)

        image_upload = upload_file_to_s3(raw_image_url)
        image_url = image_upload["url"]

        playlist = Playlist(
            user_id =  request.form['user_id'],
            title= request.form['title'],
            image_url= image_url,
            description= request.form['description']
        )

        db.session.add(playlist)
    else:
        if not any(request.files):
            playlist = Playlist.query.get(int(request.form["id"]))
            playlist.title= request.form["title"]
            playlist.description= request.form["description"]
        else:
            raw_image_url = request.files["image_url"]

            if not allowed_file(raw_image_url.filename):
                return {"errors": "file type not permitted"}, 400

            raw_image_url.filename = get_unique_filename(raw_image_url.filename)

            image_upload = upload_file_to_s3(raw_image_url)
            image_url = image_upload["url"]

            playlist = Playlist.query.get(int(request.form["id"]))
            playlist.title= request.form["title"]
            playlist.image_url= image_url,
            playlist.description= request.form["description"]




    db.session.commit()
    return playlist.to_dict()


@playlist_routes.route('/')
def get_all_playlists():
    """
    Get All Playlists
    """
    playlists = db.session.query(Playlist).options(joinedload(Playlist.songs)).all()
    mainDict = {}

    for playlist in playlists:
        mainDict[playlist.id] = playlist.to_dict()
        mainDict[playlist.id]["songs"] = []
        for song in playlist.songs:
            mainDict[playlist.id]["songs"].append(song.id)

    return jsonify(mainDict)
