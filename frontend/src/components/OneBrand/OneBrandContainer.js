import React from 'react';
import OneBrand from './OneBrand';
import Bookings from '../Bookings/Bookings';
import Reviews from './Reviews';
import GoogleMaps from './GoogleMaps';
import './OneBrandContainer.css';
import { useJsApiLoader } from '@react-google-maps/api';

function OneBrandContainer() {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

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
            <div>
                <GoogleMaps />
            </div>
        </div>
    )
}

export default OneBrandContainer
