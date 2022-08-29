import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import brandsReducer, { thunkGetOneBrand, thunkPutBrands } from '../../store/brands.js'
import { thunkGetReviews, thunkPutReviews, thunkPostReviews, thunkDeleteReviews } from '../../store/reviews.js';
import PostComment from '../PostComment'

import "./OneBrand.css"

const OneBrand = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    // const singleBrand = useSelector(state => {
    //     console.log(state.brands)
    //     return state.brands[Number(id)]
    // });

    const [errors, setErrors] = useState([]);

    const [editMode, setEditMode] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);

    // get brand
    const [singleBrand, setSingleBrand] = useState({})


    // put brand
    const [newBrandData, setNewBrandData] = useState({
        brandImg: '',
        name: '',
        address: '',
        city: '',
        country: ''
    })

    const user = useSelector(state => state.session.user)

    useEffect(async => {
        dispatch(thunkGetOneBrand(id))
            .then(res => {
                setSingleBrand(res)
                setOneBrandReviews(res.Reviews)
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
                    setErrors([res.error])
                    return
                }
                setSingleBrand(res)
            })
    }

    if (!singleBrand) return "no brand available";

    return (
        <div className='onebrand-container'>
            <div>
                <h1>{singleBrand.name}</h1>
                <img className='onebrand-image'
                    src={singleBrand.brandImg}
                />
                <div className='address-review'>
                    <h2>
                        Address:
                    </h2>
                    <div>
                        <p>
                            {singleBrand.address}
                            <br></br>
                            {singleBrand.city}
                            <br></br>
                            {singleBrand.country}
                        </p>
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
                                        style={errors.length && newReview.review.length == 0 ? { border: "1px solid red" } : null}
                                        type='text'
                                        placeholder='New Name'
                                        onChange={(e) => setNewBrandData({ ...newBrandData, name: e.target.value })}
                                    />
                                    <input
                                        style={errors.length && newReview.review.length == 0 ? { border: "1px solid red" } : null}
                                        type='text'
                                        placeholder='New Image'
                                        onChange={(e) => setNewBrandData({ ...newBrandData, brandImg: e.target.value })}
                                    />
                                    <input
                                        style={errors.length && newReview.review.length == 0 ? { border: "1px solid red" } : null}
                                        type='text'
                                        placeholder='New Address'
                                        onChange={(e) => setNewBrandData({ ...newBrandData, address: e.target.value })}
                                    />
                                    <input
                                        style={errors.length && newReview.review.length == 0 ? { border: "1px solid red" } : null}
                                        type='text'
                                        placeholder='New City'
                                        onChange={(e) => setNewBrandData({ ...newBrandData, city: e.target.value })}
                                    />
                                    <input
                                        style={errors.length && newReview.review.length == 0 ? { border: "1px solid red" } : null}
                                        type='text'
                                        placeholder='New Country'
                                        onChange={(e) => setNewBrandData({ ...newBrandData, country: e.target.value })}
                                    />
                                    <button className='button' onClick={handleSubmitEdit}>Save</button>
                                </div>
                            ) : null
                        }
                        <div className='review'>
                            <PostComment oneBrandReviews={oneBrandReviews} setOneBrandReviews={setOneBrandReviews} />
                            {
                                oneBrandReviews?.map(review => (
                                    <div
                                        key={review.id}
                                    >
                                        <div>
                                            <p>
                                                <b>
                                                    user {review.userId}'s review:
                                                </b>
                                                <div>
                                                    {review.review}
                                                </div>
                                                <div>
                                                    <b>created at: </b>{review.createdAt}
                                                </div>
                                                <div>
                                                    <b>updated at:</b> {review.updatedAt}
                                                </div>
                                            </p>

                                            {
                                                user?.id === review.userId && (
                                                    <>
                                                        <button className='button' onClick={() => {
                                                            setSelectedEdit(review.id)
                                                            setEditModeReviews(true)
                                                        }
                                                        }>
                                                            Edit Review
                                                        </button>
                                                        <button className='button' onClick={() => handleDeleteReview(review.id)}>Delete</button>
                                                        {
                                                            editModeReviews ? (
                                                                <div>
                                                                    <div>
                                                                        {errorsReview.map((error, idx) => (
                                                                            <li style={errors.length ? { color: "red" } : null} key={idx}>{error}</li>
                                                                        ))}
                                                                    </div>
                                                                    {console.log('NEW REVIEW IN EDITMODE REVIEWS', newReview)}
                                                                    <input

                                                                        style={errorsReview.length && newReview.review.length == 0 ? { border: "1px solid red" } : null}
                                                                        type='text'
                                                                        placeholder='Edit The Review'
                                                                        onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                                                                    />
                                                                    {/* <button onClick={handleSubmitReview}>Save</button> */}
                                                                    <button className='button' onClick={handleSubmitReviewEdit}>Save</button>
                                                                </div>
                                                            ) : null
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneBrand;
