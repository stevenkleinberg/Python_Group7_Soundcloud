from .db import db


class UserDetail(db.Model):
    __tablename__ = "userDetails"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,nullable=False, db.ForeignKey("users.id"))
    display_name = db.Column(db.String(50),nullable=False)
    avatar_url = db.Column(db.String)
    banner_url = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'display_name': self.display_name,
            'avatar_url':self.avatar_url
            'banner_url':self.banner_url
        }
