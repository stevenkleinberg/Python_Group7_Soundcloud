// constants
const LOAD_SONG = 'player/LOAD_SONG';
const LOAD_PLAYLIST = 'player/LOAD_PLAYLIST';
const QUEUE_SONG = 'player/QUEUE_SONG';
const QUEUE_PLAYLIST = 'player/QUEUE_PLAYLIST';
const QUEUE_ADVANCE = 'player/QUEUE_ADVANCE';
const HISTORY_STEPBACK = 'player/HISTORY_STEPBACK';

// adding song to play now and history
export const loadSong = (songId) => ({
    type: LOAD_SONG,
    songId,
});

export const loadPlaylist = (playlistId) => ({
    type: LOAD_PLAYLIST,
    playlistId,
});

// adding song to future queue
export const queueSong = (songId) => ({
    type: QUEUE_SONG,
    songId,
});

export const queuePlaylist = (playlistId) => ({
    type: QUEUE_PLAYLIST,
    playlistId,
});

// moving song from future queue into now playing and history
export const queueAdvance = () => ({
    type: QUEUE_ADVANCE,
});

// moving song from history into now playing and move now playing into queue
export const historyStepBack = () => ({
    type: HISTORY_STEPBACK,
});

// State shape:

// state.player --> {
//   playingId: id,
//   playHistory: [id, id, ...],
//   queue: [id, id, ...],
// }

const initialState = {
    playingId: null,
    playHistory: [],
    queue: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SONG: {
            const newState = {
                ...state,
            };
            if (newState.playingId) {
                newState.playHistory = [...newState.playHistory, newState.playingId];
            }
            newState.playingId = action.songId;
            return newState;
        }
        case QUEUE_SONG: {
            const newState = {
                ...state,
            };
            newState.queue = [
                ...newState.queue, action.songId,
            ];
            return newState;
        }
        case QUEUE_ADVANCE: {
            const newState = { ...state };
            if (newState.playingId) {
                newState.playHistory = [...newState.playHistory, newState.playingId];
            }
            if (newState.queue.length) {
                newState.playingId = newState.queue[0];
                newState.queue = newState.queue.slice(1);
            } else {
                newState.playingId = null;
            }
            return newState;
        }
        case HISTORY_STEPBACK: {
            const newState = { ...state };
            if (newState.playingId) {
                newState.queue = [newState.playingId, ...newState.queue];
            }
            if (newState.playHistory.length) {
                newState.playingId = newState.playHistory.pop();
                newState.playHistory = [...newState.playHistory];
            } else {
                newState.playingId = null;
            }
            return newState;
        }
        default:
            return state;
    }
}
