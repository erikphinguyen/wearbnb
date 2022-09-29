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
    console.log("INSIDE LOGIN THUNK")
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    console.log('WHAT IS DATA LOGIN THUNK', data)
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
    const { username, email, password, confirmPassword } = user;
    console.log('WHAT IS USER', user)
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
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
