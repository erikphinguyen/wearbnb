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



    const price = useSelector(state => state.bookings[id]?.price)

    // const price = useSelector(state => {
    //     let listing = state.bookings.filter(el => {
    //         return el.id === bookings.brandId
    //     })

    //     return listing[0].price
    // })

    // const price =


    const [dates, setDates] = useState({ startDate: '', endDate: '' });
    let fees = Number(price * .3);

    // this returns an array of bookings from specific user
    const bookingsFromUser = Object?.values(bookings)


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
        dispatch(thunkDeleteBookings(id))
            .then(() => {
                setBookings(bookings.filter(booking => booking.id !== id))
            })
    }

    // let startingDate = new Date(booking.startDate);
    // let endingDate = new Date(booking.endDate);

    // let jsxStartDate = startingDate.setMinutes( startingDate.getMinutes() + startingDate.getTimezoneOffset() );
    // let jsxEndDate = endingDate.setMinutes( endingDate.getMinutes() + endingDate.getTimezoneOffset() );

    /*
            // this returns an array of bookings from specific user
            const bookingsFromUser = Object?.values(bookings)
            console.log('WHAT IS BOOKINGSSFROMUSER', bookingsFromUser)

            let startingDate = new Date(bookingsFromUser[id]?.startDate)
            console.log('WHAT IS STARTING DATE TYPE', typeof startingDate)
            console.log('WHAT IS STARTINGDATE', startingDate)

            let resoStart = startingDate.setMinutes( startingDate.getMinutes() + startingDate.getTimezoneOffset() );
            console.log('WHAT IS resoStart', resoStart)
            console.log('WHAT IS STARTING DATE TYPE', typeof resoStart)

            let reservationStart = new Date(resoStart);
            console.log('WHAT IS RESERVATION START', reservationStart.toLocaleDateString())
    */

    return (
        <div className='user-bookings-container'>
            <h1>
                {username}'s Bookings:
            </h1>
            {bookingsFromUser && bookingsFromUser.map(booking => (
                booking.userId == id && (
                    <div className='user-bookings' key={booking.id}>
                        <div>
                            <h2>
                                {booking?.Brand?.name}
                            </h2>
                            <h3>
                                Reservation: {new Date(new Date(booking.startDate).setMinutes( new Date(booking.startDate).getMinutes() + new Date(booking.startDate).getTimezoneOffset() )).toLocaleDateString()} - {new Date(new Date(booking.endDate).setMinutes( new Date(booking.endDate).getMinutes() + new Date(booking.endDate).getTimezoneOffset() )).toLocaleDateString()}
                                {console.log('RESERVATION CHECK', new Date(new Date(booking.startDate).setMinutes( new Date(booking.startDate).getMinutes() + new Date(booking.startDate).getTimezoneOffset() )).toLocaleDateString())}
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
                )
            ))}
        </div>
    )
}

export default UserBookings;
