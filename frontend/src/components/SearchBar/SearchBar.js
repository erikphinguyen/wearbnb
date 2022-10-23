import React from 'react';
import './SearchBar.css'

function SearchBar({ placeholder, data }) {
    return (
        <div className='search'>
            <div className='searchInputs'>
                <input type='text' placeholder={placeholder} />
                <div className='searchIcon'>
                    Search
                </div>
            </div>
            <div className='dataResult'>
                {/* {data.map((value, key) => {
                    return <a className='dataItem' target="_blank">
                        <p>
                            {value.name}
                        </p>
                    </a>
                })} */}
            </div>
        </div>
    )
}

export default SearchBar
