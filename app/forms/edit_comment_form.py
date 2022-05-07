from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class EditCommentForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    submit = SubmitField('submit')
