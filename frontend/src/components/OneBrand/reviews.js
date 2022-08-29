import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
// import { thunkDeleteReviews } from '../../store/reviews';
import './reviews.css';
import { thunkGetReviews, thunkPutReviews, thunkPostReviews, thunkDeleteReviews } from '../../store/reviews.js';
import PostComment from '../PostComment'

const Reviews = () => {

    //PASS THIS AS PROP (ORIGINAL)
    // { reviews, setOneBrandReviews }
    const dispatch = useDispatch();
    const { id } = useParams();

    const [errors, setErrors] = useState([]);
    const [errorsReview, setErrorsReview] = useState([]);

    const [editMode, setEditMode] = useState(false);
    const [editModeReviews, setEditModeReviews] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);
    const user = useSelector(state => state.session.user)
    // get reviews
    const [reviews, setOneBrandReviews] = useState([])

    // put reviews
    const [newReview, setNewReview] = useState({
        review: ''
    })

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
                let oldReview = reviews.filter(review => review.id !== res.id);
                setOneBrandReviews([...oldReview, res])

                // for (let i = 0; i < oneBrandReviews.length; i++) {
                //     if (i === res.id) {
                //         oneBrandReviews[i] = res;
                //     }
                // }
                // setOneBrandReviews(oneBrandReviews);
            })
            .catch(err => console.log(err))
    }

    // POSTING NEW REVIEW
    const handleSubmitReview = e => {
        e.preventDefault();
        let data = {
            brandId: id,
            review: newReview.review
        }
        dispatch(thunkPostReviews(data))
            .then(res => setOneBrandReviews([...reviews, res]))
    }

    // DELETING REVIEW
    const handleDeleteReview = (id) => {
        dispatch(thunkDeleteReviews(id))
            .then(() => {
                setOneBrandReviews(reviews.filter(review => review.id !== id))
            })
    }

    // const handleDeleteReview = (id) => {
    //     dispatch(thunkDeleteReviews(id))
    //         .then(() => {
    //             let newReviews = reviews.filter(review => review.id !== id)
    //             setOneBrandReviews(newReviews)
    //         })
    // }

    return (
        <div className='reviews-container'>
            <h3>Reviews</h3>
            {
                reviews?.map((review) => (
                    <div
                        key={review.id}
                    >
                        {/* <div>{`${review.User.id} says`}</div>
                        {`@${review.User.username}`}
                        <p>{review.review}</p> */}
                        <div className='review'>
                            <PostComment reviews={reviews} setOneBrandReviews={setOneBrandReviews} />
                            {
                                reviews?.map(review => (
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
                        <button className='button' onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
                    </div>
                ))
            }
        </div>
    )

}

export default Reviews
