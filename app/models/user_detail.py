from .db import db


class UserDetail(db.Model):
    __tablename__ = "userDetails"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    display_name = db.Column(db.String(50))
    avatar_url = db.Column(db.String)
    banner_url = db.Column(db.String)

    user = db.relationship("User", back_populates="user_detail")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'display_name': self.display_name,
            'avatar_url': self.avatar_url,
            'banner_url': self.banner_url
        }
