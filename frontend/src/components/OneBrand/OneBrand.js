import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import brandsReducer, { thunkGetOneBrand, thunkPutBrands } from '../../store/brands.js'
import { thunkGetReviews, thunkPutReviews, thunkPostReviews, thunkDeleteReviews } from '../../store/reviews.js';

import "./OneBrand.css"

const OneBrand = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    // const singleBrand = useSelector(state => {
    //     console.log(state.brands)
    //     return state.brands[Number(id)]
    // });

    const [brandImg, setBrandImg] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const [errors, setErrors] = useState([]);

    const [editMode, setEditMode] = useState(false);

    // get reviews
    const [reviews, setReviews] = useState([])

    // get brand
    const [singleBrand, setSingleBrand] = useState({})


    // put brand
    const [newBrandData, setNewBrandData] = useState({
        brandImg: singleBrand.brandImg,
        name: singleBrand.name,
        address: singleBrand.address,
        city: singleBrand.city,
        country: singleBrand.country
    })

    const reset = () => {
        setNewBrandData({
            brandImg: '',
            name: '',
            address: '',
            city: '',
            country: ''
        })
        setEditMode(false)
        // setBrandImg('');
        // setName('');
        // setAddress('');
        // setCity('');
        // setCountry('');
    }

    const user = useSelector(state => state.session.user)

    useEffect(async => {
        dispatch(thunkGetOneBrand(id))
            .then(res => {
                setSingleBrand(res)
                setNewBrandData({
                    brandImg: res.brandImg,
                    name: res.name,
                    address: res.address,
                    city: res.city,
                    country: res.country
                })
                setReviews(res.Reviews)
            })
            .catch(err => console.log(err))
    }, [dispatch, id])

    const handleSubmitEdit = e => {
        e.preventDefault();
        let data = {
            id: id,
            ...newBrandData
        }
        dispatch(thunkPutBrands(data))
            .then(res => {
                if (res.error) {
                    setErrors(res.error)
                    return
                }
                setSingleBrand(res);
                reset();
            })
    }

    if (!singleBrand) return "no brand available";

    return (
        <div className='onebrand-container'>
            <div>
                <h1>{singleBrand.name}</h1>
                <h3>
                    <b>
                        {singleBrand.address}, {''}
                        {singleBrand.city}, {''}
                        {singleBrand.country}
                    </b>
                </h3>
                <img className='onebrand-image'
                    src={singleBrand.brandImg}
                />
                <div className='address-review'>
                    <div>
                        {
                            user?.id === singleBrand?.userId && (
                                <button className='button' onClick={() => setEditMode(true)}>
                                    Edit Brand
                                </button>
                            )
                        }
                        {
                            editMode ? (
                                <div>
                                    <div>
                                        {errors.map((error, idx) => (
                                            <li style={errors.length ? { color: "red" } : null} key={idx}>{error}</li>
                                        ))}
                                    </div>
                                    <input
                                        style={errors.length ? { border: "1px solid red" } : null}
                                        value={newBrandData.name}
                                        type='text'
                                        placeholder='New Name'
                                        onChange={(e) => setNewBrandData({ ...newBrandData, name: e.target.value })}
                                    />
                                    <input
                                        style={errors.length ? { border: "1px solid red" } : null}
                                        type='text'
                                        value={newBrandData.brandImg}
                                        placeholder='New Image'
                                        onChange={(e) => setNewBrandData({ ...newBrandData, brandImg: e.target.value })}
                                    />
                                    <input
                                        style={errors.length ? { border: "1px solid red" } : null}
                                        type='text'
                                        value={newBrandData.address}
                                        placeholder='New Address'
                                        onChange={(e) => setNewBrandData({ ...newBrandData, address: e.target.value })}
                                    />
                                    <input
                                        style={errors.length ? { border: "1px solid red" } : null}
                                        type='text'
                                        value={newBrandData.city}
                                        placeholder='New City'
                                        onChange={(e) => setNewBrandData({ ...newBrandData, city: e.target.value })}
                                    />
                                    <input
                                        style={errors.length ? { border: "1px solid red" } : null}
                                        type='text'
                                        value={newBrandData.country}
                                        placeholder='New Country'
                                        onChange={(e) => setNewBrandData({ ...newBrandData, country: e.target.value })}
                                    />
                                    <button className='button' onClick={handleSubmitEdit}>Save</button>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneBrand;
