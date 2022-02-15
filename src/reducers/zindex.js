import { combineReducers } from "redux";
import userReducer from './userReducer'
import promiseReducer from "./promiseReducer";
import fbReducer from './fbReducer'
import postReducer1 from './postReducer1'
import postReducer2 from './postReducer2'


const rootReducer = combineReducers({
    userState: userReducer,
    promiseState: promiseReducer,
    fbState: fbReducer, 
    postState1: postReducer1,
    postState2:postReducer2,
   
});

export default rootReducer;