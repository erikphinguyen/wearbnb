import { csrfFetch } from './csrf';
// import { response } from 'express';

// TYPES
const GET_BRANDS = 'brands/get_brands';
const GET_ONE_BRAND = 'brands/get_one_brand';
const POST_BRANDS = 'brands/post_brands';
const PUT_BRANDS = 'brands/put_brands';
const DELETE_BRANDS = 'brands/delete_brands';

// ACTION CREATORS
const getBrands = (brands) => {
    return {
        type: GET_BRANDS,
        brands
    }
}

const getOneBrand = (brand) => {
    return {
        type: GET_ONE_BRAND,
        brand
    }
}

const postBrands = (brands) => {
    return {
        type: POST_BRANDS,
        brands
    }
}

const putBrands = (brands) => {
    return {
        type: PUT_BRANDS,
        brands
    }
}

const deleteBrands = (id) => {
    return {
        type: DELETE_BRANDS,
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

    console.log('WHAT IS RESPONSE', response)
    console.log('WHAT IS DATA', data)

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
