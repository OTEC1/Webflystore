import { GET_POSTS1 } from "../actions/actionType";


const INITIAL_STATE = {
    post1:null,
}

const postReducer1 = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_POSTS1:
            return{
                ...state,post1:action.post1,
            };

            default:
                return state;
    }
}


export default postReducer1;