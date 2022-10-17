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
    const brandName = useSelector(state => state.brands[id]?.name);
    const [editModeBookings, setEditModeBookings] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    // const [price, setPrice] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    // const [currentTotalPrice, setCurrentTotalPrice] = useState(totalPrice)
    const [stayDuration, setStayDuration] = useState(0)

    const price = useSelector(state => state.bookings[id]?.price)
    const [dates, setDates] = useState({startDate : '', endDate : ''})

    // let stayDuration = useRef(0);
    // let totalPrice = useRef(0);
    let fees = Number((price * 0.3).toFixed(2));

    // PRICE ADJUSTMENTS
    useEffect(() => {
        // setStayDuration((new Date(endDate) - (new Date(startDate)) /86400000));
        // setTotalPrice(((price * stayDuration) + (fees)));
        dispatch(thunkGetBookings(id));
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

    // MAKING RESERVATIONS
    const handleSubmitReservation = e => {
        e.preventDefault();
        const data = {
            brandId,
            userId: user.id,
            startDate,
            endDate,
            price,
            totalPrice: totalPrice
        }
    }

    const handlePriceChange = e => {
        e.preventDefault();
        const data = {

        }
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

    const updateDisplayInfo = (e, date) => {
        // calculateTotalPrice()
        if (date === 'start') {
            setDates({...dates, startDate: e.target.value})
        }
        // console.log('WHAT IS START DATE',new Date(dates.endDate))
        if (date === 'end' && dates.startDate !== '') {
            console.log('WHAT IS START DATE', dates.startDate)
            console.log('WHAT IS END DATE', e.target.value)
            console.log('@@@@@@@@@@@@@@@ NEWWWWWWWWWWW',new Date(dates.startDate.split('-').join('/')))
            console.log('@@@@@@@@@@@@@@@ END DATE',new Date(e.target.value.split('-').join('/')))
            // console.log('WHAT IS END DATE', new Date(dates.startDate))
            let duration = (new Date(e.target.value) - (new Date(dates.startDate)) / 86400000);
            setTotalPrice((price * duration) + fees)
        }
        if (date === 'end') setDates({...dates, endDate: e.target.value})
    }

    const calculateTotalPrice = () => {
        if (dates.startDate !== '' && dates.endDate !== '') {
            setStayDuration((new Date(dates.endDate) - (new Date(dates.startDate)) / 86400000));
            setTotalPrice(((price * stayDuration) + (fees)));
        }
    }

    return (
        <div className='bookings-container'>
            <div className='price-container'>
                <div className='price-card'>
                    <h3>Price per day: ${`${price}`}</h3>
                    <form onSubmit={handleSubmitReservation}>
                        <div className='reservation'>
                            <input
                                placeholder='Start Date'
                                name="startDate"
                                onChange={(e) => {
                                    // setStayDuration(((new Date(endDate)) - (new Date(startDate))) / 86400000);
                                    // setStartDate(e.target.value)
                                    updateDisplayInfo(e, 'start')
                                    // calculateTotalPrice()
                                    // setTotalPrice((price * stayDuration) + (fees)).toFixed(2);
                                }}
                                value={dates.startDate}
                                type='date'
                            />
                            <input
                                placeholder='End Date'
                                name="endDate"
                                onChange={(e) => {
                                    // setStayDuration(((new Date(endDate)) - (new Date(startDate))) / 86400000);
                                    // setEndDate(e.target.value)
                                    updateDisplayInfo(e, 'end')
                                    // calculateTotalPrice()
                                    // setTotalPrice((price * stayDuration) + (fees)).toFixed(2);
                                }}
                                value={dates.endDate}
                                type='date'
                            />
                        </div>
                        <div className='hidden'>.</div>
                        <div className='reservation-button-container'>
                            <button className='reservation-button' >Reserve</button>
                        </div>
                    </form>
                    <h3>Fees (30% for tax and services): ${`${fees}`}</h3>
                    {console.log('WHAT IS TOTALPRICE', totalPrice)}
                    <h3 className='total'>Total: {`${totalPrice}`}</h3>
                </div>
                {
                    user?.id === brand?.userId && (
                        <>
                            <div className='hidden'>.</div>
                            <button className='button' onClick={() => setEditModeBookings(true)}>
                                Edit Booking Price
                            </button>
                        </>
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
                                className='new-price'
                                style={errors.length ? { border: "1px solid red" } : null}
                                value={newBooking.price}
                                type='text'
                                placeholder='New Price'
                                onChange={(e) => setNewBooking({ ...newBooking, price: e.target.value })}
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
