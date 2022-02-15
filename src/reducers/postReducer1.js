import { GET_POSTS1 } from "../actions/actionType";


const INITIAL_STATE = {
    post:null,
}

const postReducer1 = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_POSTS1:
            return{
                ...state,
                post:action.post,
            };

            default:
                return state;
    }
}


export default postReducer1;