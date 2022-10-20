import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";
import { thunkGetUserBookings, thunkDeleteBookings } from '../../store/bookings';
import * as sessionActions from '../../store/session';
import './UserBookings.css';

function UserBookings({ bookings, setBookings, Brand }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    // const bookings = useSelector(state => state.bookings);
    const user = useSelector(state => state.session.user?.id)
    const username = useSelector(state => state.session.user?.username)
    const [isLoaded, setIsLoaded] = useState(false);

    const price = useSelector(state => state.bookings[id]?.price)
    const [dates, setDates] = useState({ startDate: '', endDate: '' });
    let fees = Number(price * .3);
    console.log('WHAT IS PRICE', price)

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetUserBookings(id))
            .then(res => {
                let sortedBookings = res.sort((a, b) => a.id - b.id)
                setBookings(sortedBookings)
            })
    }, [dispatch])


    // this returns an array of bookings from specific user
    const bookingsFromUser = Object?.values(bookings)

    let stayDuration = () => {
        return (new Date(bookings.endDate?.split('-')?.join('/')) - (new Date(bookings.startDate?.split('-')?.join('/')))) / 86400000;
    }

    console.log('WHAT IS STAYDURATION', stayDuration)

    return (
        <div className='user-bookings-container'>
            <h1>
                {username}'s Bookings:
            </h1>
            {bookingsFromUser && bookingsFromUser.map(booking => (
                <div className='user-bookings' key={booking.id}>
                    <div>
                        <h2>
                            {booking?.Brand?.name}
                        </h2>
                        <p>
                            ${(booking.price)?.toFixed(2)} per day
                            <div>
                                Fees (30% for tax and services): ${((booking.price) * 0.3)?.toFixed(2)}
                            </div>
                            <div>
                                Total: $
                                {stayDuration()}
                            </div>
                            {console.log('@@@@@@@@@@@@@@@', new Date(booking.endDate.split('-').join('/')) - new Date(booking.startDate.split('-').join('/')))}
                            {/* {(booking.endDate?.split('-').join('/')) - (booking.startDate?.split('-').join('/'))} */}
                        </p>
                    </div>


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
