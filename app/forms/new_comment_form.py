from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TimeField, SubmitField
from wtforms.validators import DataRequired


class NewCommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    song_id = IntegerField('song_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    song_timestamp = TimeField('song_timestamp')
    submit = SubmitField('submit')
