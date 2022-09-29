import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom";
import { thunkGetBookings, thunkPutBookings, thunkPostBookings, thunkDeleteBookings } from '../../store/bookings';
import { thunkGetBrands, thunkGetOneBrand } from '../../store/brands';
import "./Bookings.css";

const Bookings = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(state => state.session.user);
    const brandName = useSelector(state => state.brand.name);

    const [editModeBookings, setEditModeBookings] = useState(false);
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);

    // get bookings
    const [bookings, setBookings] = useState([])

    // put bookings
    const [newBooking, setNewBooking] = useState({
        // is it a string or should use new Date()?
        startDate: '',
        endDate: ''
    })

    const reset = () => {
        setNewBooking({
            review: ''
        })
        setEditModeBookings(false)
    }

    return (
        <div className='bookings'>
            <div className='bookings-container'>

            </div>
        </div>
    )
}

export default Bookings;
