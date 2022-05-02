from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, URL


class NewSongForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    audio_url = StringField('audio_url', validators=[DataRequired()])
    description = StringField('description')
    image_url = StringField('image_url')
