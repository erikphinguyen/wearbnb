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

const putBookings = (BOOKING) => {
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
    console.log('AM I INSIDE THUNK GET BOOKINGS');
    const response = await csrfFetch(`/api/bookings/${id}`);

    if (response.ok) {
        console.log('WHAT IS RESPONSE IN THUNK GET BOOKINGS RESPONSE', response)
        const bookings = await response.json();
        dispatch(getBookings(bookings))
        return bookings
    }
}

export const thunkPutBookings = data => async (dispatch) => {
    console.log('AM I INSIDE THUNK PUT BOOKINGS')
    const response = await csrfFetch(`/api/bookings/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        console.log('WHAT IS RESPONSE IN THUNK PUT BOOKINGS RESPONSE', response)
        const bookings = await response.json();
        dispatch(getBookings(bookings))
        return bookings
    }
    else {
        const data = await response.json();
        return data
    }
}

