from flask import Blueprint, jsonify, request
from app.models import Song, db
from app.forms import NewSongForm, EditSongForm
from datetime import datetime
from app.api.utils import validation_errors_to_error_messages
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

song_routes = Blueprint('song', __name__)


@song_routes.route('/', methods=['POST', 'PUT'])
def new_song():
    """
    Create a New Song
    """
    if request.method == 'POST':
        print("IN POST METHOD")
        print(request.files,"    =========files")
        # form = NewSongForm()
        # form['csrf_token'].data = request.cookies['csrf_token']
        # print(form.data)
        # if form.validate_on_submit():


        raw_audio_url = request.files["audio_url"]
        print(raw_audio_url,"   Raw audio url")

        if not allowed_file(raw_audio_url.filename):
            return {"errors": "file type not permitted"}, 400

        raw_audio_url.filename = get_unique_filename(raw_audio_url.filename)

        audio_upload = upload_file_to_s3(raw_audio_url)

        print(audio_upload,"this is audio_upload function")

        audio_url = audio_upload["url"]
        print(audio_url, "audio url post upload")

        song = Song(
            user_id=request.form['user_id'],
            title=request.form['title'],
            audio_url=audio_url,
            description=request.form['description'],
            image_url=request.form['image_url'],
        )
        print(song)
        db.session.add(song)
        # else:
        #     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        print(request.files,"----------------")
        print(request.form,"=================")


        # form = EditSongForm()
        # form['csrf_token'].data = request.cookies['csrf_token']

        # if form.validate_on_submit():

        raw_audio_url = request.files["audio_url"]
        print(raw_audio_url,"   Raw audio url")

        if not allowed_file(raw_audio_url.filename):
            return {"errors": "file type not permitted"}, 400

        raw_audio_url.filename = get_unique_filename(raw_audio_url.filename)

        audio_upload = upload_file_to_s3(raw_audio_url)

        print(audio_upload,"this is audio_upload function")

        audio_url = audio_upload["url"]
        print(audio_url, "audio url post upload")
        song = Song.query.get(int(request.form["id"]))
        song.title = request.form['title']
        song.audio_url = audio_url,
        song.description = request.form['description']
        song.image_url = request.form['image_url']
        song.updated_at = datetime.now()
        # else:
        #     return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    db.session.commit()
    return song.to_dict()


@song_routes.route('/')
def get_all_songs():
    """
    Get All Songs
    """
    songs = Song.query.all()
    return jsonify([song.to_dict() for song in songs])

@song_routes.route('/<int:id>', methods=['DELETE'])
def delete_song(id):
    """
    Delete song of id
    """
    song = Song.query.get(id)
    if song:
        db.session.delete(song)
        db.session.commit()
        return {'id': id}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
