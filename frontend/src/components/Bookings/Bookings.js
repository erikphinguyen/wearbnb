import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom";
import { thunkGetBookings, thunkPutBookings, thunkPostBookings, thunkDeleteBookings } from '../../store/bookings';
import { thunkGetBrands, thunkGetOneBrand } from '../../store/brands';
import "./Bookings.css";

const Bookings = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { brandId } = useParams();
    const [errors, setErrors] = useState([])
    const user = useSelector(state => state.session.user);
    const brand = useSelector(state => state.brands[id])
    const brandName = useSelector(state => state.brands[id]);
    console.log('WHAT IS BRANDNAME', brandName)
    const [editModeBookings, setEditModeBookings] = useState(false);
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    // const [price, setPrice] = useState([]);
    // const [totalPrice, setTotalPrice] = useState([]);

    const price = useSelector(state => state.bookings[id])
    console.log('WHAT IS PRICE IN BOOKINGS', price)

    let stayDuration = useRef(0);
    let totalPrice = useRef(0);
    let fees = Number((price * 0.3).toFixed(2));

    // PRICE ADJUSTMENTS
    useEffect(() => {
        stayDuration.current = ((new Date(endDate)) - (new Date(startDate))) / 86400000;
        totalPrice.current = ((price * stayDuration.current) + (fees)).toFixed(2);
        dispatch(thunkGetBookings());
    }, [dispatch, startDate, endDate, price, fees]);

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

    // CALLING GET BOOKINGS
    useEffect(() => {
        dispatch(thunkGetBookings(id))
            .then(res => {
                let sortedBookings = res.sort((a, b) => a.id - b.id)
                setBookings(sortedBookings)
            })
    }, [dispatch])

    // CALLING PUT BOOKINGS
    const handleSubmitEditBookings = e => {
        e.preventDefault();
        let data = {
            id: id,
            ...newBooking
        }
        dispatch(thunkPutBookings(data))
            .then(res => {
                if (res.error) {
                    setErrors(res.error)
                    return
                }
                else {
                    setBookings(res);
                    reset();
                }
            })
    }

    return (
        <div className='bookings-container'>
            <div className='price-container'>
                <h3>Price per night: ${`${price}`}</h3>
                <h3>Fees (30% for tax and services): ${`${fees}`}</h3>
                <h3>Total: </h3>
                {
                    user?.id === bookings?.userId && (
                        <button className='button' onClick={() => setEditModeBookings(true)}>
                            Edit Booking Logistics
                        </button>
                    )
                }
                {
                    editModeBookings ? (
                        <div>
                            <div>
                                {errors.map((error, idx) => (
                                    <li style={errors.length ? { color: "red" } : null} key={idx}>{error}</li>
                                ))}
                            </div>
                            <input
                                style={errors.length ? { border: "1px solid red" } : null}
                                value={newBooking.startDate}
                                type='text'
                                placeholder='New Start Date'
                                onChange={(e) => setNewBooking({ ...newBooking, startDate: e.target.value })}
                            />
                            <input
                                style={errors.length ? { border: "1px solid red" } : null}
                                value={newBooking.endDate}
                                type='text'
                                placeholder='New End Date'
                                onChange={(e) => setNewBooking({ ...newBooking, endDate: e.target.value })}
                            />
                            <input
                                style={errors.length ? { border: "1px solid red" } : null}
                                value={newBooking.price}
                                type='text'
                                placeholder='New Price'
                                onChange={(e) => setNewBooking({ ...newBooking, price: e.target.value })}
                            />
                            <input
                                style={errors.length ? { border: "1px solid red" } : null}
                                value={newBooking.totalPrice}
                                type='text'
                                placeholder='New Total Price'
                                onChange={(e) => setNewBooking({ ...newBooking, totalPrice: e.target.value })}
                            />
                            <button className='button' onClick={handleSubmitEditBookings}>Save</button>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Bookings;
