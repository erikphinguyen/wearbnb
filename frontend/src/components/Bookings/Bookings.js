import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom";
import { thunkGetBookings, thunkPutBookings, thunkPostBookings, thunkDeleteBookings } from '../../store/bookings';
import { thunkGetBrands, thunkGetOneBrand } from '../../store/brands';
import "./Bookings.css";

const Bookings = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { brandId } = useParams();
    const user = useSelector(state => state.session.user);
    const brand = useSelector(state => state.brands)
    // console.log('WHAT IS BRAND IN BOOKINGS', brand)
    // can't get brand name
    // tried state.brands[id]['name']
    // also tried state.brands.id.name
    const brandName = useSelector(state => state.brands.id);
    // console.log('WHAT IS BRANDNAME IN BOOKINGS', brandName)
    const [editModeBookings, setEditModeBookings] = useState(false);
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    // const [price, setPrice] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);

    const price = useSelector(state => state.bookings)
    // console.log('WHAT IS PRICE IN BOOKINGS', price)

    // get bookings
    const [bookings, setBookings] = useState([])

    // put bookings
    const [newBooking, setNewBooking] = useState({
        // is it a string or should use new Date()?
        startDate: bookings.startDate,
        endDate: bookings.endDate,
        price: bookings.price,
        totalPrice: bookings.totalPrice
    })

    const reset = () => {
        setNewBooking({
            startDate: '',
            endDate: '',
            price: '',
            totalPrice: ''
        })
        setEditModeBookings(false)
    }

    // GET BOOKINGS
    useEffect(() => {
        dispatch(thunkGetBookings())
            .then(res => {
                let sortedBookings = res.sort((a, b) => a.id - b.id)
                setBookings(sortedBookings)
            })
    }, [dispatch])

    const data = {
        brandId: brand.id,
        userId: user.id,
        startDate,
        endDate,
        price,
        totalPrice
    }

    return (
        <div className='bookings'>
            <div className='bookings-container'>
                <h1>hello</h1>
            </div>
        </div>
    )
}

export default Bookings;
