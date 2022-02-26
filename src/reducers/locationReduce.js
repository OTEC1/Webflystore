import { Locations } from "../actions/actionType";


const INITIAL_STATE = {
    locations: null,
}

const locationReduce = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case Locations:
            return{
                ...state,
                 locations:action.locations,
            };

            default:
                return state;
    }
}


export default locationReduce;