import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OneBrand from './OneBrand';
import Bookings from '../Bookings/Bookings';
import Reviews from './Reviews';
// import GoogleMaps from './GoogleMaps';
import './OneBrandContainer.css';
import { thunkGetOneBrand } from '../../store/brands.js';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

function OneBrandContainer() {

    const dispatch = useDispatch();
    const { id } = useParams();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const center = { lat: 48.8584, lng: 2.2945 }

    // get brand
    const [singleBrand, setSingleBrand] = useState({})

    useEffect(() => {
        dispatch(thunkGetOneBrand(id))
            .then(res => {

                setSingleBrand(res)
            })
            .catch(err => console.log(err))
        }, [dispatch, id])
        console.log('---WHAT IS SINGLE BRAND', singleBrand)

    if (!isLoaded) {
        return <div>Loading...</div>
    }





    return (
        <div className='one-brand-container'>
            <OneBrand />
            <div className='side-by-side' id='underline'>
                <Reviews />
                <Bookings />
            </div>
            <div className='google-map'>
                {/* <GoogleMaps /> */}

                {/* <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '50%' }}>
                </GoogleMap> */}
            </div>
        </div>
    )
}

export default OneBrandContainer
