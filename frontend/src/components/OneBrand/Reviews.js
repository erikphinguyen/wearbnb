import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetReviews, thunkPutReviews, thunkPostReviews, thunkDeleteReviews } from '../../store/reviews';
import PostComment from '../PostComment'

const Reviews = () => {
    // THIS WAS PASSED IN AS PROPS PRIOR
    // { reviews, setReviews }


    const dispatch = useDispatch();
    const { id } = useParams();

    const [errorsReview, setErrorsReview] = useState([]);
    const [editModeReviews, setEditModeReviews] = useState(false);

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
    const handleDeleteReview = (id) => {
        dispatch(thunkDeleteReviews(id))
            .then(() => {
                setReviews(reviews.filter(review => review.id !== id))
            })
    }

    // DELETING REVIEW PT 2
    // const handleDeleteReview = (id) => {
    //     dispatch(thunkDeleteReviews(id))
    //         .then(() => {
    //             let newReviews = reviews.filter(review => review.id !== id)
    //             setReviews(newReviews)
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
