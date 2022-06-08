const LOAD_USERS = "user/LOAD_USERS";

const loadUsers = (users) => ({
  type: LOAD_USERS,
  users,
});

//! Get Users from Database
export const getAllUsers = () => async (dispatch) => {
  const response = await fetch("/api/users/");
  if (response.ok) {
    const users = await response.json();
    dispatch(loadUsers(users));
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS: {
      const newState = { ...state };
      action.users.forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    }
    default:
      return state;
  }
}
