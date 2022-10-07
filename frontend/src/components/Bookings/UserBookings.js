import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";
import { thunkGetUserBookings } from '../../store/bookings';

function UserBookings() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const bookings = useSelector(state => state.bookings[id]);

    useEffect(() => {
        dispatch(thunkGetUserBookings(id))
    }, [id, dispatch])

    const bookingsFromUser = Object.values(bookings)

    return (
        <div>UserBookings</div>
    )
}

export default UserBookings
