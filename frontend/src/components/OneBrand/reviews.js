import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetReviews, thunkDeleteReviews } from '../../store/reviews';

const Reviews = ({ reviews, setOneBrandReviews }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(thunkGetReviews())
            .then(res => {
                console.log('WHAT IS RES IN REVIEW.JS', res)
                setOneBrandReviews(res)
            })
    }, [dispatch])

    const handleDeleteReview = (id) => {
        dispatch(thunkDeleteReviews(id))
            .then(() => {
                let newReviews = reviews.filter(review => review.id !== id)
                setOneBrandReviews(newReviews)
            })
    }

    return (
        <div>
            <h3>Reviews</h3>
            {
                reviews.map((review) => (
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
