import { combineReducers } from "redux";
import userReducer from './userReducer'
import promiseReducer from "./promiseReducer";
import postReducer1 from './postReducer1'
import postReducer2 from './postReducer2'
import cartReducer from './cartReducer'
import reviewReducer from './reviewReducer'


const rootReducer = combineReducers({
    userState: userReducer,
    promiseState: promiseReducer,
    postState1: postReducer1,
    postState2:postReducer2,
    cartState: cartReducer,
    reviewState: reviewReducer,
   
});

export default rootReducer;