// constants
const LOAD_SONGS = "song/LOAD_SONGS";
const NEW_SONG = "song/NEW_SONG";
const REMOVE_SONG = 'song/REMOVE_SONG';

const loadSongs = (songs) => ({
    type: LOAD_SONGS,
    songs,
});

// for create and edit
const newSong = (song) => ({
    type: NEW_SONG,
    song,
});

const initialState = {};

export const createSong = (song) => async (dispatch) => {
    const response = await fetch('/api/songs/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(song),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(newSong(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

// State shape:
// state.songs --> {
//   [id]: {
//      id, user_id, title, audio_url, description, image_url, created_at, updated_at,
//      user: {},
//      comments: [],
//   },
//   [id]: {
//      id, user_id, title, audio_url, description, image_url, created_at, updated_at,
//      user: {},
//      comments: [],
//   },
// }


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case NEW_SONG: {
            const newState = {
                ...state,
                [action.song.id]: action.song,
            };
            return newState;
        }
        default:
            return state;
    }
}
