import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import { thunkGetOneBrand, thunkPutBrands } from '../../store/brands.js'
import "./OneBrand.css"

const OneBrand = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const singleBrand = useSelector(state => {
        console.log('STATE BRANDS', state.brands[id])
        return state.brands[id]
    });

    console.log(singleBrand)

    const [editMode, setEditMode] = useState(false);

    const [newBrandData, setNewBrandData] = useState({
        brandImg: '',
        name: '',
        address: '',
        city: '',
        country: ''
    })

    const handleSubmitEdit = e => {
        e.preventDefault();
        let data = {
            id: singleBrand.id,
            ...newBrandData
        }
        dispatch(thunkPutBrands(data))
    }

    if (!singleBrand) return "no brand available";

    return (
        <div>
            <div>
                <h1>{singleBrand.name}</h1>
                <img
                    src={singleBrand.brandImg}
                />
                <div>
                    <p>
                        Address:
                    </p>
                    <div>
                        <p>
                            {singleBrand.address}
                        </p>
                        <p>
                            {singleBrand.city}
                        </p>
                        <p>
                            {singleBrand.country}
                        </p>
                        <button className='button' onClick={() => setEditMode(true)}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
            {
                editMode ? (
                    <div>
                        <input
                            type='text'
                            placeholder='New Name'
                            onChange={(e) => setNewBrandData({ ...newBrandData, name: e.target.value })}
                        />
                        <button className='button' onClick={handleSubmitEdit}>Save</button>
                    </div>
                ) : null
            }
        </div>
    )
}

export default OneBrand;
