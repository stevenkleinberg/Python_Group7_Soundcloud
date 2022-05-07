from flask import Blueprint, jsonify, request
from app.models import Song, db, User
from app.forms import NewSongForm, EditSongForm
from datetime import datetime
from app.api.utils import validation_errors_to_error_messages
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from sqlalchemy.orm import relationship, sessionmaker, joinedload

song_routes = Blueprint('song', __name__)


@song_routes.route('/', methods=['POST', 'PUT'])
def new_song():
    """
    Create a New Song
    """
    if request.method == 'POST':
        form = NewSongForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            keys = list(request.files.to_dict().keys())
            if len(keys) != 2:
                return {"errors": "No file uploaded"}
            raw_audio_url = request.files["audio_url"]
            raw_image_url = request.files["image_url"]

            if not allowed_file(raw_audio_url.filename):
                return {"errors": ["audio file type not permitted"]}

            if not allowed_file(raw_image_url.filename):
                return {"errors": ["image file type not permitted"]}

            raw_audio_url.filename = get_unique_filename(raw_audio_url.filename)
            raw_image_url.filename = get_unique_filename(raw_image_url.filename)

            audio_upload = upload_file_to_s3(raw_audio_url)
            image_upload = upload_file_to_s3(raw_image_url)

            audio_url = audio_upload["url"]
            image_url = image_upload["url"]

            song = Song(
                user_id=request.form['user_id'],
                title=request.form['title'],
                audio_url=audio_url,
                description=request.form['description'],
                image_url=image_url,
            )

        db.session.add(song)
        # else:
        #     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        form = EditSongForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            if not any(request.files):
                song = Song.query.get(int(request.form["id"]))
                song.title = request.form['title']
                song.description = request.form['description']
                song.updated_at = datetime.now()
            else:

                keys = list(request.files.to_dict().keys())
                if len(keys) == 2:
                    raw_audio_url = request.files["audio_url"]
                    raw_image_url = request.files["image_url"]

                    if not allowed_file(raw_audio_url.filename):
                        return {"errors": ["audio file type not permitted"]}

                    if not allowed_file(raw_image_url.filename):
                        return {"errors": ["image file type not permitted"]}

                    raw_audio_url.filename = get_unique_filename(
                        raw_audio_url.filename)
                    raw_image_url.filename = get_unique_filename(
                        raw_image_url.filename)

                    audio_upload = upload_file_to_s3(raw_audio_url)
                    image_upload = upload_file_to_s3(raw_image_url)

                    audio_url = audio_upload["url"]
                    image_url = image_upload["url"]

                    song = Song.query.get(int(request.form["id"]))
                    song.title = request.form['title']
                    song.audio_url = audio_url,
                    song.description = request.form['description']
                    song.image_url = image_url
                    song.updated_at = datetime.now()
                elif keys[0] == "audio_url":
                    raw_audio_url = request.files["audio_url"]

                    if not allowed_file(raw_audio_url.filename):
                        return {"errors": ["audio file type not permitted"]}

                    raw_audio_url.filename = get_unique_filename(
                        raw_audio_url.filename)

                    audio_upload = upload_file_to_s3(raw_audio_url)

                    audio_url = audio_upload["url"]

                    song = Song.query.get(int(request.form["id"]))
                    song.title = request.form['title']
                    song.audio_url = audio_url,
                    song.description = request.form['description']
                    song.updated_at = datetime.now()

                elif keys[0] == "image_url":
                    raw_image_url = request.files["image_url"]

                    if not allowed_file(raw_image_url.filename):
                        return {"errors": ["image file type not permitted"]}

                    raw_image_url.filename = get_unique_filename(
                        raw_image_url.filename)

                    image_upload = upload_file_to_s3(raw_image_url)

                    image_url = image_upload["url"]

                    song = Song.query.get(int(request.form["id"]))
                    song.title = request.form['title']
                    song.description = request.form['description']
                    song.image_url = image_url
                    song.updated_at = datetime.now()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}
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


# GET /api/songs/:id/comments
@song_routes.route('/<int:id>/comments')
def get_comments_by_song_id(id):
    """
    Get all comments of song ID
    """
    song = Song.query.get(id)
    if song:
        return jsonify([comment.to_dict() for comment in song.comments])
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
