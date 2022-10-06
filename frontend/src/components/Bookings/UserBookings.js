import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";

function UserBookings() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const bookings = useSelector(state => state.bookings[id]);



    return (
        <div>UserBookings</div>
    )
}

export default UserBookings
