import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";
import { thunkGetUserBookings, thunkDeleteBookings } from '../../store/bookings';
import * as sessionActions from '../../store/session';

function UserBookings() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const bookings = useSelector(state => state.bookings);
    const user = useSelector(state => state.session.user?.id)
    const username = useSelector(state => state.session.user?.username)
    const brandName = useSelector(state => state.brands[id]?.name);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetUserBookings(id))
    }, [id, dispatch])

    console.log('WHAT IS BOOKINGS', bookings)

    // this returns an array of bookings from specific user
    const bookingsFromUser = Object?.values(bookings)
    console.log('WHAT IS BOOKINGS FROM USER', bookingsFromUser)

    let stayDuration = (startDate, endDate) => {
        return ((new Date(endDate) - (new Date(startDate)) / 86400000))
    }

    return (
        <div className='user-bookings-container'>
            <h1>
                User {user}'s Bookings
            </h1>
            {bookingsFromUser && bookingsFromUser.map(booking => (
                <div className='user-bookings'>
                    {console.log('WHAT IS BOOKING JSX', booking)}
                    {console.log('WHAT IS BOOKING NAME', booking.brandId)}
                    {/*deleting bookings*/}
                    <button
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(thunkDeleteBookings(booking?.id))
                    }}
                    Cancel Booking
                    ></button>
                </div>
            ))}
        </div>
    )
}

export default UserBookings;
