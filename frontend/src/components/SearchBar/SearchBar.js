import React from 'react';
import './SearchBar.css';

function SearchBar({ placeholder, data }) {
    return (
        <>
            <div className='search'>
                <div className='search-inputs'>
                    <input type='text' placeholder={placeholder} />
                    <div className='search-icon'>

                    </div>
                </div>
                <div className='data-result'>
                </div>
            </div>
        </>
    )
}

export default SearchBar
