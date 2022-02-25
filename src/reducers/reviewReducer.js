import { REVIEWS } from "../actions/actionType";

const INITIAL_STATE = {
    reviews:null,
}


const reviewReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case REVIEWS:
            return{
                ...state,
                reviews: action.reviews,
            };

            default:
                return state;
    }
}

export default reviewReducer;