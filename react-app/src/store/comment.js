import { newSong, getAllSongs } from "./song";

// constants
const LOAD_COMMENTS = "comment/LOAD_COMMENTS";
const NEW_COMMENT = "comment/NEW_COMMENT";
const REMOVE_COMMENT = "comment/REMOVE_COMMENT";

const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments,
});

// for create and edit
const newComment = (comment) => ({
  type: NEW_COMMENT,
  comment,
});

const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
});

// Get comments of a song from DB
export const getCommentsBySongId = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/comments/`);
  if (res.ok) {
    const comments = await res.json();
    dispatch(loadComments(comments));
  }
};

// Create comment in DB
export const createComment = (comment) => async (dispatch) => {
  const res = await fetch("/api/comments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (res.ok) {
    const data = await res.json();
    // dispatch(newComment(data));
    dispatch(newSong(data));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// Edit/Update comment from DB
export const editComment = (data) => async (dispatch) => {
  const res = await fetch(`/api/comments/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const song = await res.json();
    // dispatch(newComment(comment));
    dispatch(newSong(song));
    return song;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// Delete comment from DB
export const deleteComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const song = await res.json();
    dispatch(newSong(song));
    return song;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// State shape:
// state.comments --> {
//   [id]: {
//      id, user_id, song_id, content, song_timestamp, created_at, updated_at,
//      user: {},
//      song: {},
//   },
//   [id]: {
//      id, user_id, song_id, content, song_timestamp, created_at, updated_at,
//      user: {},
//      song: {},
//   },
// }

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMENTS: {
      const newState = { ...state };
      action.comments.forEach((comment) => {
        newState[comment.id] = comment;
      });
      return newState;
    }
    case NEW_COMMENT: {
      const newState = {
        ...state,
        [action.comment.id]: action.comment,
      };
      return newState;
    }
    case REMOVE_COMMENT: {
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;
    }
    default:
      return state;
  }
}
