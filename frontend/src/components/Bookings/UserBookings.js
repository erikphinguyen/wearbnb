import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function UserBookings() {
    const dispatch = useDispatch();
    const { id } = useParams();




    return (
        <div>UserBookings</div>
    )
}

export default UserBookings
