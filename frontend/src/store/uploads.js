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
// GET ALL PHOTOS
export const thunkGetPhotos = () => async (dispatch) => {
    const response = await csrfFetch(`/api/uploads/photos`)
    if (response.ok) {
        const photos = await response.json();
        dispatch(getPhotos(photos));
        return photos
    }
}

// GET ALL VIDEOS
export const thunkGetVideos = () => async (dispatch) => {
    const response = await csrfFetch(`/api/uploads/videos`)
    if (response.ok) {
        const videos = await response.json();
        dispatch(getVideos(videos));
        return videos
    }
}

export const thunkPostPhotos = (data) => async dispatch => {
    const response = await csrfFetch(`/api/uploads/photos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const photo = await response.json();
        dispatch(postPhotos(photo));
        return photo;
    }
    else {
        const data = await response.json()
        return data
    }
};

export const thunkPostVideos = (data) => async dispatch => {
    const response = await csrfFetch(`/api/uploads/videos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const video = await response.json();
        dispatch(postVideos(video));
        return video;
    }
    else {
        const data = await response.json()
        return data
    }
};

export const thunkDeletePhotos = (id) => async dispatch => {
    const response = await csrfFetch(`/api/uploads/photos/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { id }= await response.json();
        dispatch(deletePhotos(id));
        return id;
    }
};
export const thunkDeleteVideos = (id) => async dispatch => {
    const response = await csrfFetch(`/api/uploads/videos/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { id }= await response.json();
        dispatch(deleteVideos(id));
        return id;
    }
};

// REDUCER
// const initialState = { entries: {}, isLoading: true };

const uploadsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PHOTOS:
            const newPhotos = {};
            action.uploads.forEach(photo => {
                newPhotos[photo.id] = photo;
            })
            return {
                ...newPhotos
            }
        case GET_VIDEOS:
            const newVideos = {};
            action.videos.forEach(video => {
                newVideos[video.id] = video;
            })
            return {
                ...newVideos
            }
            case POST_PHOTOS:
                const postState = { ...state };
                postState[action.uploads.id] = action.uploads
                return postState;
        case DELETE_BRANDS:
            const deleteState = { ...state };
            delete deleteState[action.id]
            return deleteState;
        default:
            return state;
    }
};

export default uploadsReducer;
