from flask import Blueprint, jsonify, request
from app.models import Song, db
from app.forms import NewSongForm, EditSongForm
from datetime import datetime
from app.api.utils import validation_errors_to_error_messages

song_routes = Blueprint('song', __name__)


@song_routes.route('/', methods=['POST', 'PUT'])
def new_song():
    """
    Create a New SOng
    """
    if request.method == 'POST':
        form = NewSongForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            song = Song(
                user_id=form.data['user_id'],
                title=form.data['title'],
                audio_url=form.data['audio_url'],
                description=form.data['description'],
                image_url=form.data['image_url'],
            )
            db.session.add(song)
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        print('Im in the right place')
        form = EditSongForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print(form.data)
        if form.validate_on_submit():
            print(form.data)
            songId = form.data['id']
            song = Song.query.get(songId)
            song.title = form.data['title']
            song.audio_url = form.data['audio_url']
            song.description = form.data['description']
            song.image_url = form.data['image_url']
            song.updated_at = datetime.now()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    db.session.commit()
    return song.to_dict()


@song_routes.route('/')
def get_all_songs():
    """
    Get All Songs
    """
    songs = Song.query.all()
    return jsonify([song.to_dict() for song in songs])
