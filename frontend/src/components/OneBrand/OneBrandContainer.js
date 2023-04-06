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
import Geocode from "react-geocode";

function OneBrandContainer() {

    const dispatch = useDispatch();
    const { id } = useParams();

    // get brand
    const [singleBrand, setSingleBrand] = useState({});
    const [center, setCenter] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        dispatch(thunkGetOneBrand(id))
            .then(res => {
                console.log('------------------', res)
                console.log('------------------ ADDY', res.address)
                setSingleBrand(res)
                Geocode.fromAddress(res.address).then(
                    response => {
                        const { lat, lng } = response.results[0].geometry.location;
                        setCenter({ lat, lng });
                    },
                    error => {
                        console.error(error);
                    }
                );
            })
            .catch(err => console.log(err))
    }, [dispatch, id])


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })



    if (!isLoaded) {
        return <div>Loading...</div>
    }



    console.log('WHAT IS SINGLE BRAND', singleBrand)


    return (
        <div className='one-brand-container'>
            <OneBrand />
            <div className='side-by-side' id='underline'>
                <Reviews />
                <Bookings />
            </div>
            <div className='google-map'>
                {/* <GoogleMaps /> */}
                <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '50%' }}>

                </GoogleMap>
            </div>
        </div>
    )
}

export default OneBrandContainer
