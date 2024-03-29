import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};


export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return data;

    // const data = await response.json();
    // dispatch(setUser(data.user));
    // return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { images, image, username, email, password, confirmPassword } = user;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    // for multiple files
    if (images && images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
    }

    // for single file
    if (image) formData.append("image", image);

    //AWS S3
    const res = await csrfFetch(`/api/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    const data = await res.json();
    dispatch(setUser(data.user));

    return data;

    /* ORIGINAL CODE
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
            confirmPassword
        }),
    });
    // BEFORE SIGN UP ERRORS
    // const data = await response.json();
    // dispatch(setUser(data.user));
    // return response;
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        // if (data.errors) {
        //     return data.errors;
        // }
        return data.error;
    } else {
        return ['An error occurred. Please try again.']
    }

    // const data = await response.json();
    // dispatch(setUser(data.user));
    // return response;
    */
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        /* ORIGINAL CODE
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        */
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
