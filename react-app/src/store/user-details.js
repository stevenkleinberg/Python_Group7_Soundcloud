// constants
const LOAD_DETAILS = "detail/LOAD_DETAILS";
const NEW_DETAIL = "detail/NEW_DETAIL";
const REMOVE_DETAIL = "detail/REMOVE_DETAIL";

const loadDetails = (details) => ({
    type: LOAD_DETAILS,
    details,
});

// for create and edit
const newDetail = (detail) => ({
    type: NEW_DETAIL,
    detail,
});

const removeDetail = (id) => {
    return {
        type: REMOVE_DETAIL,
        id,
    };
};

//! Create User Details in the database
export const createDetail = (detail) => async (dispatch) => {
    const response = await fetch("/api/details/", {
        method: "POST",
        body: detail,
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(newDetail(data));
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

//! Get Details from the Database
export const getAllDetails = () => async (dispatch) => {
    const response = await fetch("/api/details/");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadDetails(data));
    }
};

//! Edit/Update Details from the db
export const editDetails = (data) => async (dispatch) => {
    const response = await fetch(`/api/details/`, {
        method: "PUT",
        body: data,
    });
    if (response.ok) {
        const detail = await response.json();
        dispatch(newDetail(detail));
        return detail;
    }
};

//!Delete Details from the db
export const deleteDetails = (id) => async (dispatch) => {
    const response = await fetch(`/api/details/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        await response.json();
        dispatch(deleteDetails(id));
        return id;
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case NEW_DETAIL: {
            const newState = {
                ...state,
                [action.detail.id]: action.detail,
            };
            return newState;
        }
        case LOAD_DETAILS: {
            const newState = { ...state };
            action.details.forEach((detail) => {
                newState[detail.id] = detail;
            });
            return newState;
        }
        case REMOVE_DETAIL: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
}
