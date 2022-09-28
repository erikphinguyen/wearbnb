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
