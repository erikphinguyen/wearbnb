import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetReviews, thunkPutReviews, thunkPostReviews, thunkDeleteReviews } from '../../store/reviews';

const Reviews = ({ reviews, setOneBrandReviews }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [errorsReview, setErrorsReview] = useState([]);
    const [editModeReviews, setEditModeReviews] = useState(false);

    // get reviews
    const [oneBrandReviews, setOneBrandReviews] = useState([])

    // put reviews
    const [newReview, setNewReview] = useState({
        review: ''
    })

    const user = useSelector(state => state.session.user)

    // FIX THIS
    useEffect(async => {
        dispatch(thunkGetReviews)
    })


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
                let oldReview = oneBrandReviews.filter(review => review.id !== res.id);
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

    // DELETING REVIEW
    const handleDeleteReview = (id) => {
        dispatch(thunkDeleteReviews(id))
            .then(() => {
                setOneBrandReviews(oneBrandReviews.filter(review => review.id !== id))
            })
    }

    // DELETING REVIEW PT 2
    // const handleDeleteReview = (id) => {
    //     dispatch(thunkDeleteReviews(id))
    //         .then(() => {
    //             let newReviews = reviews.filter(review => review.id !== id)
    //             setOneBrandReviews(newReviews)
    //         })
    // }

    return (
        <div>
            <h3>Reviews</h3>
            {
                reviews?.map((review) => (
                    <div
                        key={review.id}
                    >
                        {/* <div>{`${review.User.id} says`}</div> */}
                        {/* {`@${review.User.username}`} */}
                        <p>{review.review}</p>
                        <button className='button' onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
                    </div>
                ))
            }
        </div>
    )

}

export default Reviews
