const LOAD_USER = "users/LOAD_USERS";

const loadUsers = (users) => ({
  type: LOAD_USER,
  users,
});

export const getAllUsers = () => async (dispatch) => {
  const response = await fetch(`/api/getusers/`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadUsers(data));
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER: {
      const newState = { ...state };
      action.users.forEach((user) => {
        newState[user.id] = user;
      });
      // newState.id = action.details.id;
      // newState.avatar_url = action.details.avatar_url;
      // newState.banner_url = action.details.banner_url;
      // newState.display_name = action.details.display_name;
      return newState;
    }

    default:
      return state;
  }
}
