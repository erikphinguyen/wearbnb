import { csrfFetch } from './csrf';

// TYPES
const GET_REVIEWS = 'reviews/get_reviews';
const POST_REVIEWS = 'reviews/post_reviews';
const PUT_REVIEWS = 'reviews/put_reviews'
const DELETE_REVIEWS = 'reviews/delete_reviews';

// ACTION CREATORS
const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

const postReviews = (reviews) => {
    return {
        type: POST_REVIEWS,
        reviews
    }
}

const putReviews = (reviews) => {
    return {
        type: PUT_REVIEWS,
        reviews
    }
}

const deleteReviews = (id) => {
    return {
        type: DELETE_REVIEWS,
        id
    }
}

// THUNKS
// ALL REVIEWS ON ONE IMAGE
export const thunkGetReviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviews(reviews));
        return reviews
    }
}

export const thunkPutReviews = data => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(putReviews(review));
        return review;
    }
};

export const thunkPostReviews = (data) => async dispatch => {
    console.log(data)
    const response = await csrfFetch(`/api/reviews/${data.brandId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const reviews = await response.json();
        dispatch(postReviews(reviews));
        return reviews;
    }
};

export const thunkDeleteReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { id: deletedReviewId } = await response.json();
        dispatch(deleteReviews(deletedReviewId));
        return deletedReviewId;
    }
};

// REDUCER

// const initialState = { entries: {}, isLoading: true };

const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            const getState = {};
            action.reviews.forEach(review => {
                getState[review.id] = review;
            })
            return {
                ...getState
            }
        case DELETE_REVIEWS:
            const deleteState = { ...state };
            delete deleteState[action.id];
            return deleteState;
        case POST_REVIEWS:
            const postState = { ...state };
            postState[action.reviews.id] = action.reviews;
            return postState;
        // NEED TO CHECK PUT REVIEWS
        case PUT_REVIEWS:
            return {
                ...state,
                [action.reviews.id]: action.reviews
            }
        default:
            return state;
    }
};

export default reviewsReducer;
