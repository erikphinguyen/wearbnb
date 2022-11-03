import { csrfFetch } from './csrf';

// TYPES
const GET_PHOTOS = 'uploads/get_photos';
const GET_VIDEOS = 'uploads/get_videos';
const POST_PHOTOS = 'uploads/post_photos';
const POST_VIDEOS = 'uploads/post_videos';
const DELETE_PHOTOS = 'uploads/delete_photos';
const DELETE_VIDEOS = 'uploads/delete_videos';

// ACTION CREATORS
const getPhotos = (photos) => {
    return {
        type: GET_PHOTOS,
        photos
    }
}

const getVideos = (videos) => {
    return {
        type: GET_VIDEOS,
        videos
    }
}

const postPhotos = (photos) => {
    return {
        type: POST_PHOTOS,
        photos
    }
}

const postVideos = (videos) => {
    return {
        type: POST_VIDEOS,
        videos
    }
}

const deletePhotos = (id) => {
    return {
        type: DELETE_PHOTOS,
        id
    }
}

const deleteVideos = (id) => {
    return {
        type: DELETE_VIDEOS,
        id
    }
}

// THUNKS
// GET ALL BRANDS
export const thunkGetBrands = () => async (dispatch) => {
    const response = await csrfFetch(`/api/brands`)
    if (response.ok) {
        const brands = await response.json();
        dispatch(getBrands(brands));
        return brands
    }
}

// GET ONE BRAND
export const thunkGetOneBrand = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/brands/${id}`)
    if (response.ok) {
        const brand = await response.json();
        dispatch(getOneBrand(brand));
        return brand
    }
}

export const thunkPutBrands = data => async dispatch => {
    const response = await csrfFetch(`/api/brands/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const brand = await response.json();
        dispatch(putBrands(brand));
        return brand;
    }
    else {
        const data = await response.json()
        return data
    }
};

export const thunkPostBrands = (data) => async dispatch => {
    const response = await csrfFetch(`/api/brands`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const brand = await response.json();
        dispatch(postBrands(brand));
        return brand;
    }
    else {
        const data = await response.json()
        return data
    }
};

export const thunkDeleteBrands = (id) => async dispatch => {
    const response = await csrfFetch(`/api/brands/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { id: deletedBrandId } = await response.json();
        dispatch(deleteBrands(deletedBrandId));
        return deletedBrandId;
    }
};

// REDUCER
// const initialState = { entries: {}, isLoading: true };


const brandsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BRANDS:
            const newBrands = {};
            action.brands.forEach(brand => {
                newBrands[brand.id] = brand;
            })
            return {
                ...newBrands
            }
        case GET_ONE_BRAND:
            const newState = { ...state };
            newState[action.brand.id] = action.brand
            return newState
        case DELETE_BRANDS:
            const deleteState = { ...state };
            delete deleteState[action.id]
            return deleteState;
        case POST_BRANDS:
            const postState = { ...state };
            postState[action.brands.id] = action.brands
            return postState;
        case PUT_BRANDS:
            return {
                ...state,
                [action.brands.id]: action.brands
            };
        default:
            return state;
    }
};

export default brandsReducer;
