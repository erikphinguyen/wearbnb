import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";
import { thunkGetUserBookings } from '../../store/bookings';

function UserBookings() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const bookings = useSelector(state => state.bookings[id]);
    const user = useSelector(state.session.user?.id)
    const username = useSelector(state => state.session.user?.username)
    const brandName = useSelector(state => state.brands[id]?.name);

    useEffect(() => {
        dispatch(thunkGetUserBookings(id))
    }, [id, dispatch])

    // this returns an array of bookings from specific user
    const bookingsFromUser = Object.values(bookings)

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
                    <p>
                        {brandName}
                    </p>
                    <p>
                        {`${booking.price} / ${stayDuration(booking.startDate, booking.endDate)}`}
                    </p>
                    <p>
                        {`Total: ${booking.totalPrice}`}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default UserBookings
