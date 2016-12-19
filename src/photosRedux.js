import axios from 'axios';

export const RETRIEVE_PHOTOS_SUCCESS = 'RETRIEVE_PHOTOS_SUCCESS';


export const actionCreators = {
    retrievePhotos(page) {
        return function (dispatch) {
            return axios.get(`http://www.curatist.co:8081/insta/${page*20}/20`)
                .then(res => {
                    console.log("reasssss: ", res)
                    dispatch({type: 'RETRIEVE_PHOTOS_SUCCESS', photos: res.data});
                })
                .catch(error => {
                    console.log('Popular', error); //eslint-disable-line
                });
        };
    }
};



const initialState = {
    error: false,
    photos: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'RETRIEVE_PHOTOS_SUCCESS': {
            console.log(action)
            return {...state, photos: action.photos}
        }
    }

    return state
}
