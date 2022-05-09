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
      return newState;
    }

    default:
      return state;
  }
}
