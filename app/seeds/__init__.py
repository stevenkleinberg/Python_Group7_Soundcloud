from flask.cli import AppGroup
from .users import seed_users, undo_users
from .songs import seed_songs, undo_songs
from .user_details import seed_user_details, undo_user_details
from .playlists import seed_playlists, undo_playlists
from .playlistSong import seed_playlist_songs, undo_playlist_songs

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_songs()
    seed_user_details()
    seed_playlists()
    seed_playlist_songs()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_playlist_songs()
    undo_user_details()
    undo_playlists()
    undo_songs()
    undo_users()
    # Add other undo functions here
