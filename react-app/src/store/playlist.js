const LOAD_PLAYLISTS = "playlist/LOAD_PLAYLISTS";
const NEW_PLAYLIST = "playlist/NEW_PLAYLIST";
const REMOVE_PLAYLIST = "playlsit/REMOVE_PLAYLIST";

const loadPlaylists = (playlists) => ({
  type: LOAD_PLAYLISTS,
  playlists,
});

const newPlaylist = (playlist) => ({
  type: NEW_PLAYLIST,
  playlist,
});

const removeSong = (playlistId) => ({
  type: REMOVE_PLAYLIST,
  playlistId,
});

export const addSongtoPlaylist = (data) => async (dispatch) => {
  const response = await fetch("/api/playlistsongs/", {
    method: "POST",
    body: data,
  });

  if (response.ok) {
    const playlist = await response.json();
    dispatch(newPlaylist(playlist));
    return playlist;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

//!Create playlist in the database
export const createPlaylist = (playlist) => async (dispatch) => {
  const response = await fetch("/api/playlists/", {
    method: "POST",
    body: playlist,
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(newPlaylist(data));
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

//!Get Songs from the Database
export const getAllPlaylists = () => async (dispatch) => {
  const response = await fetch("/api/playlists/");
  if (response.ok) {
    const playlists = await response.json();
    dispatch(loadPlaylists(playlists));
  }
};

//!Edit playlist in the database
export const editPlaylist = (data) => async (dispatch) => {
  const response = await fetch("/api/playlists/", {
    method: "PUT",
    body: data,
  });
  if (response.ok) {
    const playlist = await response.json();
    dispatch(newPlaylist(playlist));
    return playlist;
  }
};

//!Delete Playlist from the database
export const deletePlaylist = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await response.json();
    dispatch(removeSong(playlistId));
    return playlistId;
  }
};

// State shape:
// state.playlist --> {
//   [id]: {
//      id, user_id, title, audio_url, songs_order, image_url, description, created_at, updated_at,
//      songs:[1,2,3,4]
//   },
//   [id]: {
//      id, user_id, title, audio_url, songs_order, image_url, description, created_at, updated_at,
//      songs:[]
//   },
// }

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_PLAYLIST: {
      const newState = {
        ...state,
        [action.playlist.id]: action.playlist,
      };
      return newState;
    }
    case LOAD_PLAYLISTS: {
      const newState = { ...state };
      Object.values(action.playlists).forEach((playlist) => {
        newState[playlist.id] = playlist;
      });
      return newState;
    }
    case REMOVE_PLAYLIST: {
      const newState = { ...state };
      delete newState[action.playlistId];
      return newState;
    }
    default:
      return state;
  }
}
