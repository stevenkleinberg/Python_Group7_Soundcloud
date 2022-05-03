from flask import Blueprint, jsonify, request
from app.models import Song, db
from app.forms import NewSongForm
from app.api.utils import validation_errors_to_error_messages

song_routes = Blueprint('song', __name__)


@song_routes.route('/', methods=['POST'])
def new_song():
    """
    Create a New SOng
    """
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
        db.session.commit()
        return song.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@song_routes.route('/')
def get_all_songs():
    """
    Get All Songs
    """
    songs = Song.query.all()
    return jsonify([song.to_dict() for song in songs])
