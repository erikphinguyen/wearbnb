import React from 'react';
import OneBrand from './OneBrand';
import Bookings from '../Bookings/Bookings';
import Reviews from './Reviews';
import './OneBrandContainer.css';

function OneBrandContainer() {
    return (
        <div className='one-brand-container'>
            <OneBrand />
            <div className='side-by-side'>
                <Reviews />
                <Bookings />
            </div>
        </div>
    )
}

export default OneBrandContainer
