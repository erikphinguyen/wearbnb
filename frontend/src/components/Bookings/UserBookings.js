import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";
import { thunkGetUserBookings, thunkDeleteBookings } from '../../store/bookings';
import * as sessionActions from '../../store/session';

function UserBookings() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const bookings = useSelector(state => state.bookings);
    const user = useSelector(state => state.session.user?.id)
    const username = useSelector(state => state.session.user?.username)
    const brandName = useSelector(state => state.brands[id]?.name);
    const [isLoaded, setIsLoaded] = useState(false);

    const price = useSelector(state => state.bookings[id]?.price)
    const [dates, setDates] = useState({startDate : '', endDate : ''});
    let fees = Number(price * .3);
    console.log('WHAT IS PRICE', price)

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetUserBookings(id))
    }, [id, dispatch])

    console.log('WHAT IS BOOKINGS', bookings)

    // this returns an array of bookings from specific user
    const bookingsFromUser = Object?.values(bookings)
    console.log('WHAT IS BOOKINGS FROM USER', bookingsFromUser)

    let stayDuration = () => {
        return (new Date(bookings?.endDate.split('-').join('/')) - (new Date(bookings?.startDate.split('-').join('/')))) / 86400000;
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
                        <p>
                            {booking.price}
                            {stayDuration()}
                            {console.log('@@@@@@@@@@@@@@@',new Date(booking.endDate.split('-').join('/')) - new Date(booking.startDate.split('-').join('/')))}
                            {(booking.endDate?.split('-').join('/')) - (booking.startDate?.split('-').join('/'))}
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
