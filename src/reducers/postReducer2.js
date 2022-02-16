import { GET_POSTS2 } from "../actions/actionType";


const INITIAL_STATE = {
    post2:null,
}

const postReducer2 = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_POSTS2:
            return{
                ...state,post2:action.post2,
            };

            default:
                return state;
    }
}


export default postReducer2;