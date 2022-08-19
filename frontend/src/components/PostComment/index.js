import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkPostReviews } from '../../store/reviews';

function PostReview({ oneBrandReviews, setOneBrandReviews }) {
    const dispatch = useDispatch();

    const [review, setReview] = useState('');
    const [errors, setErrors] = useState([]);

    const selectUser = useSelector(state => {
        return state.session.user
    })

    const user = useSelector(state => state.session.user)

    const { id } = useParams()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newReview = {
            userId: selectUser.id,
            brandId: id,
            review
        }
            .then(res => {
                if (res.error) {
                    setErrors([res.error])
                    return
                }
                setOneBrandReviews([...oneBrandReviews, res])
                // setReview(newReview)
            })
    };


    return (
        <>
            {/* <h2>
                Upload New Review
            </h2>
            <form onSubmit={handleSubmit}>
                {errors.map((error, idx) => (
                    <li style={errors.length ? { color: "red" } : null} key={idx}>{error}</li>
                ))}
                <input
                    className='input'
                    style={errors.length && review.length == 0 ? { border: "1px solid red" } : null}
                    type='text'
                    onChange={(event) => setReview(event.target.value)}
                    value={review}
                    placeholder='New Review'
                    name='review'
                />
            </form> */}
            {
                user?.id && (
                    <>
                        <h2>
                            Upload New Review
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {errors.map((error, idx) => (
                                <li style={errors.length ? { color: "red" } : null} key={idx}>{error}</li>
                            ))}
                            <input
                                className='input'
                                style={errors.length && review.length == 0 ? { border: "1px solid red" } : null}
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
        </>
    )

}

export default PostReview
