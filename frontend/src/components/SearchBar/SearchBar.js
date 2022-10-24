import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ placeholder, data }) {

    const [filteredData, setFilteredData] = useState([]);
    const [brandEntered, setBrandEntered] = useState('');

    const handleFilter = (e) => {
        const searchBrand = e.target.value;
        setBrandEntered(searchBrand)
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchBrand.toLowerCase())
        })
        if (searchBrand === "") {
            setFilteredData([])
        }
        else {
            setFilteredData(newFilter)
        }
    }

    const clearInput = () => {
        setFilteredData([]);
        setBrandEntered('')
    }

    return (
        <div className='search'>
            <div className='searchInputs'>
                <input
                    type='text'
                    placeholder={placeholder}
                    value={brandEntered}
                    onChange={handleFilter} />
                <div className='searchIcon'>
                    {/*search bar react tutorial ~28 min */}
                    {filteredData.length === 0 ? <p>Search Icon here</p> : <p>Close Icon here</p>}
                </div>
            </div>
            {(filteredData.length !== 0) && (
                <div className='dataResult'>
                    {/* {filteredData.slice(0,15).map((value, key) => {
                    return <a className='dataItem' target="_blank">
                        <p>
                            {value.name}
                        </p>
                    </a>
                })} */}
                </div>
            )}
        </div>
    )
}

export default SearchBar
