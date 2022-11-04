import React, { useState } from 'react';
import './SearchBar.css';
import { csrfFetch } from '../../store/csrf';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';

function SearchBar({ placeholder }) {

    const [filteredData, setFilteredData] = useState([]);
    const [brandEntered, setBrandEntered] = useState('');

    const handleFilter = async (e) => {
        setBrandEntered(e.target.value)
        const searchBrand = e.target.value;
        let data = { searchTerm: e.target.value }
        const response = await csrfFetch(`/api/brands/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const brands = await response.json()

        setFilteredData(brands)
        // setBrandEntered(searchBrand)
        // const newFilter = data.filter((value) => {
        //     return value.name.toLowerCase().includes(searchBrand.toLowerCase())
        // })
        // if (searchBrand === "") {
        //     setFilteredData([])
        // }
        // else {
        //     setFilteredData(newFilter)
        // }
    }

    // for X icon
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
                    {filteredData.length === 0 ? <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} /> : <FontAwesomeIcon className='x-icon' id='clearBtn' onClick={clearInput} icon={faXmark} />}
                </div>
            </div>
            {(filteredData.length !== 0) && (
                <div className='dataResult'>
                    {filteredData.map((brand) => {
                        return <NavLink to={`/brands/${brand.id}`} className='dataItem' target="_blank">
                            <p>
                                {brand.name}
                            </p>
                        </NavLink>
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar
