import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import brandsReducer, { thunkGetOneBrand, thunkPutBrands } from '../../store/brands.js'
import { thunkGetReviews, thunkPutReviews, thunkPostReviews, thunkDeleteReviews } from '../../store/reviews.js';
import PostComment from '../PostComment'

import "./OneBrand.css"

const OneBrand = () => {
    // console.log('THIS IS PROPS IN ONEBRAND', props)
    // console.log('PROPS HISTORY LOCATION', props)
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log('CHECKING ID IN ONBRAND', id)
    // const singleBrand = useSelector(state => {
    //     console.log(state.brands)
    //     return state.brands[Number(id)]
    // });

    const [editMode, setEditMode] = useState(false);
    const [editModeReviews, setEditModeReviews] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);

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

    const user = useSelector(state => state.session.user)

    useEffect(async => {
        console.log('USE EFFECT ONE BRAND BEFORE RES')
        dispatch(thunkGetOneBrand(id))
            .then(res => {
                console.log("USE EFFECT ONE BRAND", res)
                setSingleBrand(res)
                setOneBrandReviews(res.Reviews)
            })
            .catch(err => console.log(err))
    }, [dispatch, id])

    console.log('WHAT IS SINGLE BRAND', singleBrand)

    // console.log(singleBrand)

    const handleSubmitEdit = e => {
        e.preventDefault();
        let data = {
            id: id,
            ...newBrandData
        }
        dispatch(thunkPutBrands(data))
            .then(res => setSingleBrand(res))
    }

    // EDITING REVIEW
    console.log('FINDING ONNE BRAND REVIEWS', oneBrandReviews)
    console.log('FINDING NEW REVIEW', newReview)
    const handleSubmitReviewEdit = e => {
        e.preventDefault();
        let data = {
            id: selectedEdit,
            ...newReview
        }
        console.log('DATA IN EDITING REVIEW', data)
        dispatch(thunkPutReviews(data))
            .then(res => {
                // this posts
                // setOneBrandReviews([...oneBrandReviews, res])
                // setOneBrandReviews(oneBrandReviews.filter(review => review.id !))

                // edit
                // let idx;
                // for (let i = 0; i < oneBrandReviews.length; i++) {
                //     if (i === res.id) {
                //         idx = i;
                //     }
                // }
                // let newReview = [];
                // let oldReview = oneBrandReviews.filter(review => review.id !== res.id);
                // for (let i = 0; i < oldReview.length; i++)  {
                //     if (i === idx) {
                //         newReview.push(res)
                //     }
                //     newReview.push(oldReview[i])
                // }
                // setOneBrandReviews(newReview)

                //edit with less code
                let oldReview = oneBrandReviews.filter(review => review.id !== res.id);
                setOneBrandReviews([...oldReview, res])

                // for (let i = 0; i < oneBrandReviews.length; i++) {
                //     if (i === res.id) {
                //         oneBrandReviews[i] = res;
                //     }
                // }
                // setOneBrandReviews(oneBrandReviews);
            })
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
                        {
                            user?.id === singleBrand?.id && (
                                <button className='button' onClick={() => setEditMode(true)}>
                                    Edit Brand
                                </button>
                            )
                        }
                        <div>
                            <PostComment oneBrandReviews={oneBrandReviews} setOneBrandReviews={setOneBrandReviews} />
                            {
                                oneBrandReviews?.map(review => (
                                    <div
                                        key={review.id}
                                    >
                                        <div>
                                            <p>
                                                {review.review}
                                            </p>
                                            <button onClick={() => {
                                                setSelectedEdit(review.id)
                                                setEditModeReviews(true)
                                            }
                                            }>
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
                        {console.log('NEW REVIEW IN EDITMODE REVIEWS', newReview)}
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
