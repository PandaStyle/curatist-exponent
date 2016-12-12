import axios from 'axios';

export const types = {
    FETCH_POSTS_REQUEST: 'FETCH_POSTS_REQUEST',
    FETCH_POSTS_RESPONSE: 'FETCH_POSTS_RESPONSE',
    CLEAR_POSTS: 'CLEAR_POSTS',
    RETRIEVE_PHOTOS_SUCCESS: 'RETRIEVE_PHOTOS_SUCCESS'
}

export const actionCreators = {
    fetchPosts: () => async (dispatch, getState) => {

        try {
            fetch('http://www.curatist.co:8081/feed/all/25').then(function(response) {
                // Convert to JSON
                return response.json();
            }).then(function(posts) {
                // Yay, `j` is a JavaScript object
                dispatch({type: types.FETCH_POSTS_RESPONSE, payload: posts})
            }).catch( (e) => {
                dispatch({type: types.FETCH_POSTS_RESPONSE, payload: e, error: true})
            })
        } catch (e) {
            dispatch({type: types.FETCH_POSTS_RESPONSE, payload: e, error: true})
        }
    },

    // It's common for action creators to return a promise for easy chaining,
    // which is why this is declared async (async functions always return promises).
    clearPosts: () => async (dispatch, getState) => {
        if (getState().posts.length > 0) {
            dispatch({type: types.CLEAR_POSTS})
        }
    },

    retrievePhotos: (page) => async (dispatch) => {
            try {
                axios.get(`http://www.curatist.co:8081/insta/${page*20}/20`)
                .then(res => {
                    dispatch({type: types.RETRIEVE_PHOTOS_SUCCESS, payload: res.data, page: page+1});
                })
                .catch(error => {
                    dispatch({type: types.RETRIEVE_PHOTOS_SUCCESS, payload: error, error: true, page: page+1})
                    console.log('Popular', error); //eslint-disable-line
                });
            } catch (e) {
                dispatch({type: types.RETRIEVE_PHOTOS_SUCCESS, payload: e, error: true, page: page+1})
            }
    }
}

const initialState = {
    loading: true,
    error: false,
    posts: [],
    photos: [],
    photosCurrentPage: 0
}

export const reducer = (state = initialState, action) => {
    const {type, payload, error, page} = action

    switch (type) {
        case types.FETCH_POSTS_REQUEST: {
            return {...state, loading: true, error: false}
        }
        case types.FETCH_POSTS_RESPONSE: {
            if (error) {
                return {...state, loading: false, error: true}
            }

            return {...state, loading: false, posts: payload}
        }
        case types.RETRIEVE_PHOTOS_SUCCESS: {

            if (error) {
                return {...state, loading: false, error: true, page: page}
            }

            return {...state, loading: false, photos: state.photos.concat(payload), photosCurrentPage: page }
        }
    }

    return state
}
