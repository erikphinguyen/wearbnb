import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkPostReviews } from '../../store/reviews';

function PostReview({oneBrandReviews, setOneBrandReviews}) {
    console.log('HITTING POST REVIEW FX');
    const dispatch = useDispatch();

    const [review, setReview] = useState('');

    const selectUser = useSelector(state => {
        return state.session.user
    })

    const { id } = useParams()
    console.log('WHAT IS ID', id)
    console.log("WHAT IS SELECT USER", selectUser)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newReview = {
            userId: selectUser.id,
            brandId: id,
            review
        }
        console.log('---------------------------FINDING NEW REVIEW--------------------------------', newReview)
        dispatch(thunkPostReviews(newReview))
            .then(res => {
                setOneBrandReviews([...oneBrandReviews, res])
                // setReview(newReview)
            })
    };


    return (
        <>
            <h2>
                Upload New Review
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={(event) => setReview(event.target.value)}
                    value={review}
                    placeholder='New Review'
                    name='review'
                />
            </form>
            <button className='button' onClick={handleSubmit} type='submit'>Submit</button>
        </>
    )

}

export default PostReview
