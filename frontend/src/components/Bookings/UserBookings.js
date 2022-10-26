import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";
import { thunkGetUserBookings, thunkDeleteBookings } from '../../store/bookings';
import * as sessionActions from '../../store/session';
import { csrfFetch } from '../../store/csrf';
import './UserBookings.css';

function UserBookings({ bookings, setBookings, Brand }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(state => state.session.user?.id)
    const username = useSelector(state => state.session.user?.username)
    const [isLoaded, setIsLoaded] = useState(false);

    const bookingState = useSelector(state => {
        return state.bookings
    })


    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@ WHAT IS BOOKINGS STATE', bookingState)
    const price = useSelector(state => state.bookings[id]?.price)

    // const price = useSelector(state => {
    //     let listing = state.bookings.filter(el => {
    //         console.log('@@@@@@@@@@@@@@@@@@@@@ WHAT IS EL', el)
    //         return el.id === bookings.brandId
    //     })

    //     return listing[0].price
    // })

    // const price =

    console.log('WHAT IS PRICE', price)

    const [dates, setDates] = useState({ startDate: '', endDate: '' });
    let fees = Number(price * .3);

    // this returns an array of bookings from specific user
    const bookingsFromUser = Object?.values(bookings)
    console.log('WHAT IS BOOKINGSFROMUSER', bookingsFromUser)

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetUserBookings(id))
            .then(res => {
                let sortedBookings = res.sort((a, b) => a.id - b.id)
                setBookings(sortedBookings)
            })
    }, [dispatch])

    // DELETING BOOKING
    // const handleDeleteBooking = (id) => {
    //     dispatch(thunkDeleteBookings(id))
    //         .then(() => {
    //             // let deleteBookings = bookingsFromUser.filter(deleteBooking => deleteBooking.id !== id);
    //             let deleteBookings = bookings.filter(deleteBooking => deleteBooking.id !== id);
    //             setBookings(deleteBookings)
    //         })
    // }
    const handleDeleteBooking = (id) => {
        console.log('WHAT IS BOOKING ID', id)
        dispatch(thunkDeleteBookings(id))
            .then(() => {
                setBookings(bookings.filter(booking => booking.id !== id))
            })
    }

    return (
        <div className='user-bookings-container'>
            <h1>
                {username}'s Bookings:
            </h1>
            {bookingsFromUser && bookingsFromUser.map(booking => (
                <div className='user-bookings' key={booking.id}>
                    <div>
                        <h2>
                            {booking?.Brand?.name}
                        </h2>
                        <h3>
                            Reservation: {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </h3>
                        <p>
                            <b>Price per day:</b> ${(booking.price)?.toFixed(2)}
                            <div>
                                <b>Fees (30% for tax and services):</b> ${((booking.price) * 0.3)?.toFixed(2)}
                            </div>
                            <div>
                                <b>Total:</b> $
                                {(((((new Date(booking.endDate)) - (new Date(booking.startDate))) / 86400000) * (booking.price)) * 1.3)?.toFixed(2)}
                            </div>
                        </p>
                        {/*deleting bookings*/}
                        <button className='button' onClick={() => handleDeleteBooking(booking.id)}>
                            Cancel Booking
                        </button>
                    </div>


                </div>
            ))}
        </div>
    )
}

export default UserBookings;
