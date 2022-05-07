from flask import Blueprint, jsonify, request
from app.models import Comment, Song, db
from app.forms import NewCommentForm, EditCommentForm
from datetime import datetime, time
from app.api.utils import validation_errors_to_error_messages


comment_routes = Blueprint('comment', __name__)


# POST /api/comments
@comment_routes.route('/', methods=['POST'])
def new_comment():
    """
    Create a New Comment
    """
    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            content=form.data['content'],
            user_id=form.data['user_id'],
            song_id=form.data['song_id'],
            song_timestamp=form.data['song_timestamp'],
        )
        db.session.add(comment)
        db.session.commit()

        song = Song.query.get(form.data['song_id'])
        return song.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# PUT /api/comments/:id
@comment_routes.route('/<int:id>', methods=['PUT'])
def edit_comment(id):
    """
    Edit Comment at ID
    """
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment.query.get(id)
        print(comment)
        comment.content = form.data['content']
        comment.updated_at = datetime.now()
        db.session.commit()

        song = Song.query.get(comment.song_id)
        return song.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE /api/comments/:id
@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    """
    Delete Comment at ID
    """
    comment = Comment.query.get(id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {'id': id}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
