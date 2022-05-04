// constants
const LOAD_SONG = 'player/LOAD_SONG';
const LOAD_PLAYLIST = 'player/LOAD_PLAYLIST';
const QUEUE_SONG = 'player/QUEUE_SONG';
const QUEUE_PLAYLIST = 'player/QUEUE_PLAYLIST';

export const loadSong = (songId) => ({
    type: LOAD_SONG,
    songId,
});

export const loadPlaylist = (playlistId) => ({
    type: LOAD_PLAYLIST,
    playlistId,
});

export const queueSong = (songId) => ({
    type: QUEUE_SONG,
    songId,
});

export const queuePlaylist = (playlistId) => ({
    type: QUEUE_PLAYLIST,
    playlistId,
});

// State shape:

// state.player --> {
//   queue: [id, id, ...],
//   playHistory: [id, id, ...],
//   playingId: id,
// }

const initialState = {
    queue: [],
    playHistory: [],
    playingId: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SONG: {
            const newState = {
                ...state,
                playingId: action.songId,
            };
            newState['playHistory'] = [
                ...newState['playHistory'], action.songId,
            ];
            return newState;
        }
        default:
            return state;
    }
}
