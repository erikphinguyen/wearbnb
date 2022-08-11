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

    const [editMode, setEditMode] = useState(false);
    const [editModeReviews, setEditModeReviews] = useState(false);

    // get brand
    const [singleBrand, setSingleBrand] = useState({})
    // console.log(singleBrand)


    // put reviews
    const [newReview, setNewReview] = useState({
        review: ''
    })

    // get reviews
    const [oneBrandReviews, setOneBrandReviews] = useState([])

    // put brand
    const [newBrandData, setNewBrandData] = useState({
        brandImg: '',
        name: '',
        address: '',
        city: '',
        country: ''
    })

    useEffect(() => {
        dispatch(thunkGetOneBrand(id))
            .then(res => {
                console.log("USE EFFECT ONE BRAND", res)
                setSingleBrand(res)
                setOneBrandReviews(res.Reviews)
            })
            .catch(err => console.log(err))
    }, [dispatch, id])

    // console.log(singleBrand)

    const handleSubmitEdit = e => {
        e.preventDefault();
        let data = {
            id: singleBrand.id,
            ...newBrandData
        }
        dispatch(thunkPutBrands(data))
    }

    const handleSubmitReviewEdit = e => {
        e.preventDefault();
        let data = {
            id: oneBrandReviews.id,
            ...newReview
        }
        dispatch(thunkPutReviews(data))
    }

    // POSTING NEW REVIEW
    const handleSubmitReview = e => {
        e.preventDefault();
        let data = {
            brandId: id,
            review: newReview.review
        }
        dispatch(thunkPostReviews(data))
            .then(res => setOneBrandReviews([...oneBrandReviews, res]))
    }

    // DELETING REVIEW
    const handleDeleteReview = (id) => {
        dispatch(thunkDeleteReviews(id))
            .then(() => {
                setOneBrandReviews(oneBrandReviews.filter(review => review.id !== id))
            })
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
                            Edit Brand
                        </button>
                        <div>
                            {
                                oneBrandReviews.map(review => (
                                    <div
                                        key={review.id}
                                    >
                                        <div>
                                            <p>
                                                {review.review}
                                            </p>
                                            <button onClick={() => setEditModeReviews(true)}>
                                                Edit Review
                                            </button>
                                            <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
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
                        <input
                            type='text'
                            placeholder='New Image'
                            onChange={(e) => setNewBrandData({ ...newBrandData, brandImg: e.target.value })}
                        />
                        <input
                            type='text'
                            placeholder='New Address'
                            onChange={(e) => setNewBrandData({ ...newBrandData, address: e.target.value })}
                        />
                        <input
                            type='text'
                            placeholder='New City'
                            onChange={(e) => setNewBrandData({ ...newBrandData, city: e.target.value })}
                        />
                        <input
                            type='text'
                            placeholder='New Country'
                            onChange={(e) => setNewBrandData({ ...newBrandData, country: e.target.value })}
                        />
                        <button className='button' onClick={handleSubmitEdit}>Save</button>
                    </div>
                ) : null
            }
            {
                editModeReviews ? (
                    <div>
                        <input
                            type='text'
                            placeholder='Edit The Review'
                            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                        />
                        {/* <button onClick={handleSubmitReview}>Save</button> */}
                        <button onClick={handleSubmitReviewEdit}>Save</button>
                    </div>
                ) : null
            }
        </div>
    )
}

export default OneBrand;
