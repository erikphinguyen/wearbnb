import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetReviews, thunkPutReviews, thunkPostReviews, thunkDeleteReviews } from '../../store/reviews';
import PostComment from '../PostComment'
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

    const user = useSelector(state => state.session.user)

    // FIX THIS
    useEffect(async => {
        dispatch(thunkGetReviews())
            .then(res => {
                setReviews(res)
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
                let oldReview = reviews.filter(review => review.id !== res.id);
                setReviews([...oldReview, res])

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

    // THIS WAS UNDER <H3>REVIEWS</H3>
    // {
    //     reviews?.map((review) => (
    //         <div
    //             key={review.id}
    //         >
    //             {/* <div>{`${review.User.id} says`}</div> */}
    //             {/* {`@${review.User.username}`} */}
    //             <p>{review.review}</p>
    //             <button className='button' onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
    //         </div>
    //     ))
    // }

    return (
        <div className='reviews-page'>
            <h3>Reviews</h3>
            <div className='reviews-container'>
                <PostComment reviews={reviews} setReviews={setReviews} />
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
                                                                <li style={errorsReview.length ? { color: "red" } : null} key={idx}>{error}</li>
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
    )

}

export default Reviews
