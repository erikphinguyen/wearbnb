import { csrfFetch } from './csrf';

// TYPES
const GET_BOOKINGS = 'bookings/get_bookings';
const POST_BOOKINGS = 'bookings/post_bookings';
const PUT_BOOKINGS = 'bookings/put_bookings'
const DELETE_BOOKINGS = 'bookings/delete_bookings';

// ACTION CREATORS
const getBookings = (bookings) => {
    return {
        type: GET_BOOKINGS,
        bookings
    }
}

const postBookings = (bookings) => {
    return {
        type: POST_BOOKINGS,
        bookings
    }
}

const putBookings = (booking) => {
    return {
        type: PUT_BOOKINGS,
        booking
    }
}

const deleteBookings = (id) => {
    return {
        type: DELETE_BOOKINGS,
        id
    }
}

// THUNKS
export const thunkGetBookings = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${id}`);
    if (response.ok) {
        const bookings = await response.json();
        dispatch(getBookings(bookings))
        return bookings
    }
}

export const thunkGetUserBookings = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${userId}`);

    if (response.ok) {
        const bookings = await response.json();
        dispatch(getBookings(bookings));
        return bookings;
    }
}

export const thunkPutBookings = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const bookings = await response.json();
        dispatch(putBookings(bookings))
        return bookings
    }
    else {
        const data = await response.json();
        return data
    }
}

export const thunkPostBookings = (data) => async (dispatch) => {
    console.log('helloooooooooooooooooooooooooooooo')
    const response = await csrfFetch(`/api/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log('@@@@@@@@@@@@@@@@@@@@ response THUNK POST BOOKINGS', response)
    if (response.ok) {
        console.log('@@@@@@@@@@@@@@@@@@@@ response OK', response)
        const bookings = await response.json();
        dispatch(postBookings(bookings));
        return bookings;
    }
    else {
        const data = await response.json()
        return data
    }
};

export const thunkDeleteBookings = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        // try new way
        // dispatch(deleteBookings(id))
        // old way
        const { id } = await response.json();
        dispatch(deleteBookings(id));
        return id;
    }
};

// REDUCER
const bookingsReducer = (state = {}, action) => {
    if (state.errors) delete state.errors
    switch (action.type) {
        case GET_BOOKINGS:
            const getState = {};
            action.bookings.forEach(booking => {
                getState[booking.id] = booking;
            })
            return {
                ...getState
            }
        case PUT_BOOKINGS:
            return {
                ...state,
                [action.booking.id]: action.booking
            }
        case POST_BOOKINGS:
            const postState = { ...state };
            postState[action.bookings] = action.bookings;
            return postState;
        case DELETE_BOOKINGS:
            const deleteState = { ...state };
            delete deleteState[action.id]
            return deleteState;
        default:
            return state;
    }
}

export default bookingsReducer;
