from curses.ascii import US
from email.mime import image
from flask import Blueprint, jsonify, request
from app.models import UserDetail, db
from datetime import datetime
from app.api.utils import validation_errors_to_error_messages
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

detail_routes = Blueprint('detail', __name__)


@detail_routes.route('/', methods=['POST', 'PUT'])
def new_detail():
    """
    Create New Details
    """
    if request.method == 'POST':
        # raw_avatar_url = request.files["avatar_url"]
        # raw_banner_url = request.files["banner_url"]

        # image_avatar = upload_file_to_s3(raw_avatar_url)
        # image_banner = upload_file_to_s3(raw_banner_url)

        detail = UserDetail(
            user_id=request.form['user_id'],
            display_name=request.form['display_name'],
            avatar_url=request.form["avatar_url"],
            banner_url=request.form["banner_url"],
        )

        db.session.add(detail)
    else:

        if not any(request.files):
            detail = UserDetail.query.get(int(request.form["id"]))
            detail.display_name = request.form['display_name']
            detail.updated_at = datetime.now()
        else:
            keys = list(request.files.to_dict().keys())
            print(keys,"================")
            if len(keys) == 2:
                raw_avatar_url = request.files["avatar_url"]
                raw_banner_url = request.files["banner_url"]

                if not allowed_file(raw_avatar_url.filename):
                    return {"errors": "file type not permitted"}, 400

                if not allowed_file(raw_banner_url.filename):
                    return {"errors": "file type not permitted"}, 400

                raw_avatar_url.filename = get_unique_filename(
                    raw_avatar_url.filename)
                raw_banner_url.filename = get_unique_filename(
                    raw_banner_url.filename)

                avatar_upload = upload_file_to_s3(raw_avatar_url)
                banner_upload = upload_file_to_s3(raw_banner_url)

                avatar_image = avatar_upload["url"]
                banner_image = banner_upload["url"]

                detail = UserDetail.query.get(int(request.form["id"]))
                detail.display_name = request.form['display_name']
                detail.avatar_url = avatar_image
                detail.banner_url = banner_image
                detail.updated_at = datetime.now()
            elif keys[0] == "avatar_url":
                raw_avatar_url = request.files["avatar_url"]

                if not allowed_file(raw_avatar_url.filename):
                    return {"errors": "file type not permitted"}, 400

                raw_avatar_url.filename = get_unique_filename(
                    raw_avatar_url.filename)

                avatar_upload = upload_file_to_s3(raw_avatar_url)

                avatar_url = avatar_upload["url"]

                detail = UserDetail.query.get(int(request.form["id"]))
                detail.display_name = request.form['display_name']
                detail.avatar_url = avatar_url,
                detail.updated_at = datetime.now()
            elif keys[0] == "banner_url":
                raw_banner_url = request.files["banner_url"]
                if not allowed_file(raw_banner_url.filename):
                    return {"errors": "file type not permitted"}, 400
                raw_banner_url.filename = get_unique_filename(
                    raw_banner_url.filename)

                image_upload = upload_file_to_s3(raw_banner_url)

                banner_url = image_upload["url"]

                detail = UserDetail.query.get(int(request.form['id']))
                detail.display_name = request.form['display_name']
                detail.banner_url = banner_url
                detail.updated_at = datetime.now()

        db.session.commit()
        return detail.to_dict()

    db.session.commit()
    return detail.to_dict()


@detail_routes.route('/')
def get_details():
    """
    Get Details
    """
    details = UserDetail.query.all()
    return jsonify([detail.to_dict() for detail in details])
    # details = UserDetail.query.filter(UserDetail.id == id).one()
    # return details.to_dict()


@detail_routes.route('/<int:id>', methods=['DELETE'])
def delete_detail(id):
    """
    Delete detail of id
    """
    detail = UserDetail.query.filter(UserDetail.user_id == id).one()
    if detail:
        db.session.delete(detail)
        db.session.commit()
        return {'id': id}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
