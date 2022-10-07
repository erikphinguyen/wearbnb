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

    let stayDuration = (startDate, endDate) => {
        return ((new Date(endDate) - (new Date(startDate)) / 86400000))
    }

    return (
        <div>UserBookings</div>
    )
}

export default UserBookings
