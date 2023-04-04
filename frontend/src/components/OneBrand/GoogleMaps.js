import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetOneBrand } from '../../store/brands.js'


function GoogleMaps() {

    const dispatch = useDispatch();
    const { id } = useParams();

    // get brand
    const [singleBrand, setSingleBrand] = useState({})

    useEffect(async => {
        dispatch(thunkGetOneBrand(id))
            .then(res => {
                setSingleBrand(res)
            })
            .catch(err => console.log(err))
    }, [dispatch, id])

    console.log('WHAT IS SINGLE BRAND', singleBrand)
    console.log('WHAT IS ADDRESS', singleBrand.address)
    const center = singleBrand.address ? { lat: singleBrand.address.lat, lng: singleBrand.address.lng } : { lat: 0, lng: 0 }
    console.log('WHAT IS CENTER', center)

    // console.log('WHAT IS SINGLE BRAND', singleBrand)

    return (
        <div>
            GoogleMaps
        </div>
    )
}

export default GoogleMaps;
