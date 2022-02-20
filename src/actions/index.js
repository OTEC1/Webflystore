import {auth, provider, signInWithPopup}  from '../firebase';
import { collection,getDocs, where, query} from 'firebase/firestore/lite';
import { SET_USER ,SET_PROMISE, GET_POSTS1, GET_POSTS2, CART_ORDER} from './actionType';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
import axios from 'axios';
import swal from 'sweetalert2'
import db from '../firebase';
var CryptoJS = require("crypto-js");








export const setUser = (payload) => ({
    type: SET_USER,
    user:payload,
});



export const setPromise = (payload) => ({
    type: SET_PROMISE,
    promise:payload,
});







export const setPost1 = (payload) => ({
    type: GET_POSTS1,
    post1:payload,
});




export const setPost2 = (payload) => ({
    type: GET_POSTS2,
    post2:payload,
});





export const cartAdded = (payload) => ({
    type: CART_ORDER,
    cart: payload,
})







export function signInfacebookApi(m){
    return (dispatch) => {
            console.log(m.profile)
            dispatch(setUser(m.profile))
        }
};


export function handleError(error){
    console.log(error)
    }



export function signInAPIGoogle(){
    return(dispatch) => {
        signInWithPopup(auth,provider)
        .then((paid) => {
            console.log(paid.user)
            dispatch(setUser(paid.user))
        })
        .catch((err) => alert(err.message))
    };
}





export function signOutGoogleApi(){
    console.log("Google");
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null));
        })
        .catch((err) => {
            console.log(err);
        });
    };
}





export function  getListPostTop() {
    let list = [];
    return  async (dispatch) => {
            const   data = query(collection(db,process.env.REACT_APP_HOME_CALL));
            const response  =  await getDocs(data);
            if(response.empty)
                return

            response.forEach(doc => {
                list.push(doc.data());
                dispatch(setPost1(list))
            })      
    };
}





export function  getListPostbottom() {

    let list = [];

    return  async (dispatch)  => {
            const   data = query(collection(db,process.env.REACT_APP_HOME_CALL));
            const response  =  await getDocs(data);
            if(response.empty)
                return
           
            response.forEach(doc => {
                list.push(doc.data());
                dispatch(setPost2(list))
            })
            
    }
}




export function getUserAuth(data){
    return (dispatch) => {
            auth.onAuthStateChanged(async (use) => {
                if(use)
                    dispatch(setUser(use)) 
            });     
    };
};





export function  addtocart(cart){
        if(cart)
            return (dispatch) => {
                dispatch(cartAdded(cart));
            }
        else
            return (dispatch) => {
                dispatch(cartAdded(null));
            }
}






export function  formation(datas){
    return  datas = datas.charAt(0).toUpperCase() + datas.slice(1); 
}
    

export function Count(list) {
    return  JSON.parse(list).length;
}



export  function updatePostlikes(count){
    
}


let n=1;
export function Currency(){
    return  n === 1 ? "$" : "₦"
}


export function RUNCHEK(){
return 0;
}


export function SUM(cart_list){
   
    let track=0,sum=0;
    if(cart_list){
        for(let n=0; n<cart_list.length; n++){
                track = cart_list[n].quantity *  cart_list[n].price;
                sum = sum + track;
        }
    }
    return sum;
}



export function  format(count){
    let m;
        if(count < 1000)
                m=count;
        else if(count >= 1000 && count < 1999)
                m="1k+"
        else if(count >= 2000 && count < 2999)
               m="2k+"
        else if(count >= 3000 && count < 3999)
               m="3k+"
        else if(count >= 4000 && count < 4999)
              m="4k+"
       else if(count >= 5000 && count < 5999)
              m="5k+"
       else if(count >= 6000 && count < 6999)
              m="6k+"
       else if(count >= 7000 && count < 7999)
              m="7k+"
       else if(count >= 8000 && count < 8999)
              m="8k+"
       else if(count >= 9000 && count < 9999)
              m="9k+"
       else if(count > 10000)
              m="🔥🔥"
    return m
}



