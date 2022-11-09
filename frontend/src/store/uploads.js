import { csrfFetch } from './csrf';

// TYPES
const GET_IMAGES = 'images/get_images';
const GET_ONE_IMAGE = 'images/get_one_image';
const POST_IMAGES = 'images/post_images';
const DELETE_IMAGES = 'images/delete_images';

// ACTION
const getImages = (images) => {
    return {
        type: GET_IMAGES,
        images
    }
}

const getOneImage = (image) => {
    return {
        type: GET_ONE_IMAGE,
        image
    }
}

const postImages = (image) => {
    return {
        type: POST_IMAGES,
        image
    }
}

const deleteImages = (id) => {
    return {
        type: DELETE_IMAGES,
        id
    }
}

// THUNKS
export const thunkGetImages = () => async (dispatch) => {
    const response = await csrfFetch(`api/uploads`);

    if (response.ok) {
        const images = await response.json();
        dispatch(getImages(images));
        return images;
    }
}

export const thunkGetOneImage = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/uploads/${id}`)
    if (response.ok) {
        const image = await response.json();
        dispatch(getOneImage(image));
        return image
    }
}

export const thunkPostImage = (data) => async (dispatch) => {
    const { images } = data;

    Array.from(images).forEach(async image => {
        const formData = new FormData();
        formData.append('image', image);

        const response = await csrfFetch(`/api/uploads`, {
            method: 'POST',
            headers: { 'Content-Type': 'multipartform-data' },
            body: formData
        })

        if (response.ok) {
            let s3Image = await response.json();
            dispatch(postImages(s3Image))
            return s3Image
        }
        else {
            const data = await response.json();
            return data
        }
    })
}

// REDUCER
const uploadsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_IMAGES:
            const newImage = {};
            action.images.forEach(image => {
                newImage[image.id] = image
            })
            return {
                ...newImage
            }
        case GET_ONE_IMAGE:
            const newState = { ...state };
            newState[action.image.id] = action.image
            return newState
        case POST_BRANDS:
            const postState = { ...state };
            postState[action.images.id] = action.images
            return postState;
        default:
            return state;
    }
}

export default uploadsReducer;
