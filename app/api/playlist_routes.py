from flask import Blueprint,jsonify,request
from app.models import Playlist, db,Song
from datetime import datetime
from app.forms import NewPlaylistForm, EditPlaylistForm
from app.api.utils import validation_errors_to_error_messages
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
        # print(len(request.form),"+=++=+++=====")
        form = NewPlaylistForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            if not any(request.files):
                if len(request.form) == 2:
                    playlist = Playlist(
                    user_id =  request.form['user_id'],
                    image_url="https://soundtownbucket.s3.us-west-1.amazonaws.com/SoundTown-icon-with-text-black-bg.png",
                    title= request.form['title'])
                else:
                    playlist = Playlist(
                    user_id =  request.form['user_id'],
                    image_url="https://soundtownbucket.s3.us-west-1.amazonaws.com/SoundTown-icon-with-text-black-bg.png",
                    title= request.form['title'],
                    description= request.form["description"])

            else:
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
            return {'errors': ["please fill out the title and description"]}, 401
    else:
        form = EditPlaylistForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
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
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
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



@playlist_routes.route('/<int:id>',methods=['DELETE'])
def delete_playlist(id):
    """
    Delete playlist by id
    """

    playlist = Playlist.query.get(id)
    if playlist:
        db.session.delete(playlist)
        db.session.commit()
        return {"id":id}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
