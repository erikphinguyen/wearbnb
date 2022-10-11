import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetReviews, thunkPutReviews, thunkPostReviews, thunkDeleteReviews } from '../../store/reviews';
import PostReview from '../PostReview'
import './Reviews.css'

const Reviews = () => {
    // THIS WAS PASSED IN AS PROPS PRIOR
    // { reviews, setReviews }

    const dispatch = useDispatch();
    const { id } = useParams();

    const [errorsReview, setErrorsReview] = useState([]);
    const [editModeReviews, setEditModeReviews] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);

    // get reviews
    const [reviews, setReviews] = useState([])

    // put reviews
    const [newReview, setNewReview] = useState({
        review: ''
    })

    const reset = () => {
        setNewReview({
            review: ''
        })
        setEditModeReviews(false)
    }

    const user = useSelector(state => state.session.user)
    // const username = useSelector(state => state.session.user.username)
    // console.log('WHAT IS USERNAME', username)

    // GET REVIEWS
    useEffect(() => {
        dispatch(thunkGetReviews(id))
            .then(res => {
                let sortedReviews = res.sort((a, b) => {
                    if (new Date(a.createdAt) > new Date(b.createdAt)) {
                        return 1
                    }
                    else if (new Date(a.createdAt) < new Date(b.createdAt)) {
                        return -1
                    }
                    if (a.userId > b.userId) {
                        return 1
                    }
                    else if (a.userId < b.userId) {
                        return -1
                    }
                    else {
                        return 0
                    }
                })
                setReviews(sortedReviews)
            })
    }, [dispatch])


    // POSTING NEW REVIEW
    const handleSubmitReview = e => {
        e.preventDefault();
        let data = {
            brandId: id,
            review: newReview.review
        }
        dispatch(thunkPostReviews(data))
            .then(res => setReviews([...reviews, res]))
    }



    // EDITING REVIEW
    const handleSubmitReviewEdit = e => {
        e.preventDefault();
        let data = {
            id: selectedEdit,
            ...newReview
        }

        dispatch(thunkPutReviews(data))
            .then(res => {
                if (res.error) {
                    setErrorsReview([res.error])
                    return
                }
                dispatch(thunkGetReviews(id))
                    .then(res => {
                        let sortedReviews = res.sort((a, b) => {
                            if (new Date(a.createdAt) > new Date(b.createdAt)) {
                                return 1
                            }
                            else if (new Date(a.createdAt) < new Date(b.createdAt)) {
                                return -1
                            }
                            if (a.userId > b.userId) {
                                return 1
                            }
                            else if (a.userId < b.userId) {
                                return -1
                            }
                            else {
                                return 0
                            }
                        })

                        setReviews(sortedReviews)
                        reset();
                    })
                // this posts
                // setReviews([...reviews, res])
                // setReviews(reviews.filter(review => review.id !))

                // edit
                // let idx;
                // for (let i = 0; i < reviews.length; i++) {
                //     if (i === res.id) {
                //         idx = i;
                //     }
                // }
                // let newReview = [];
                // let oldReview = reviews.filter(review => review.id !== res.id);
                // for (let i = 0; i < oldReview.length; i++)  {
                //     if (i === idx) {
                //         newReview.push(res)
                //     }
                //     newReview.push(oldReview[i])
                // }
                // setReviews(newReview)

                //edit with less code
                // let oldReview = reviews.filter(review => review.id !== res.id);
                // oldReview.push(res)
                // let sortedReviews = reviews.sort((a,b) => b.createdAt - a.createdAt)
                // setReviews(sortedReviews)

                // for (let i = 0; i < reviews.length; i++) {
                //     if (i === res.id) {
                //         reviews[i] = res;
                //     }
                // }
                // setReviews(reviews);
            })
            .catch(err => console.log(err))
    }

    // DELETING REVIEW
    // const handleDeleteReview = (id) => {
    //     dispatch(thunkDeleteReviews(id))
    //         .then(() => {
    //             setReviews(reviews.filter(review => review.id !== id))
    //         })
    // }

    // DELETING REVIEW PT 2
    const handleDeleteReview = (id) => {
        dispatch(thunkDeleteReviews(id))
            .then(() => {
                let newReviews = reviews.filter(review => review.id !== id)
                setReviews(newReviews)
            })
    }


    return (
        <div className='reviews-page'>
            <h3>Reviews</h3>
            <div className='reviews-container'>
                <PostReview reviews={reviews} setReviews={setReviews} />
                {
                    reviews?.map(review => (
                        <div
                            key={review.id}
                        >
                            <div>
                                {review.review && (
                                    <p>
                                        <b>
                                            {/* {review.userId == 1 && review.userId = "Demo-lition"} */}
                                            user {review?.userId}'s review:
                                        </b>
                                        <div>
                                            {/* so review.review doesn't exist */}
                                            {review.review}
                                        </div>
                                        <div>
                                            <b>created at: </b>{(review.createdAt)}
                                        </div>
                                    </p>
                                )}

                                {
                                    (user?.id === review.userId && review.review) && (
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
                                                editModeReviews && selectedEdit === review.id ? (
                                                    <div>
                                                        <div>
                                                            {errorsReview.map((error, idx) => (
                                                                <li style={errorsReview.length ? { color: "red" } : null} key={idx}>{error}</li>
                                                            ))}
                                                        </div>
                                                        {console.log('NEW REVIEW IN EDITMODE REVIEWS', newReview)}
                                                        <input
                                                            style={errorsReview.length && newReview.review.length == 0 ? { border: "1px solid red" } : null}
                                                            type='text'
                                                            value={newReview.review}
                                                            placeholder='Edit The Review'
                                                            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                                                        />
                                                        {/* <button onClick={handleSubmitReview}>Post</button> */}
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
    )

}

export default Reviews
