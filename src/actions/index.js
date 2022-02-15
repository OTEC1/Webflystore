import {auth, provider, signInWithPopup}  from '../firebase';
import { collection,getDocs, where, query} from 'firebase/firestore/lite';
import { SET_USER ,SET_PROMISE,FB_USER, GET_POSTS1, GET_POSTS2} from './actionType';
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



export const setFBUSER = (payload) => ({
    type: FB_USER,
    fbuser:payload,
});




export const setPost1 = (payload) => ({
    type: GET_POSTS1,
    post:payload,
});




export const setPost2 = (payload) => ({
    type: GET_POSTS2,
    post:payload,
});





export function handleError(error){
console.log(error)
}





export function signInfacebookApi(m){
    console.log("facebook",m);
    return (dispatch) => {
            dispatch(setFBUSER(m))
        }
};



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
            dispatch(setFBUSER(null))
        })
        .catch((err) => {
            console.log(err);
        });
    };
}



export function signOutCustomApi() {
    console.log("Custom");
    return (dispatch) => {
        dispatch(setUser(null));
    };
}



export function  getListPostTop() {

    return  async (dispatch)  => {
            const   data = query(collection(db,process.env.REACT_APP_HOME_CALL), where("section","==", "topview"));
            const response  =  await getDocs(data);
            if(response.empty)
                return

            response.forEach(doc => {
                console.log(doc.data());
            })
            
    }
}





export function  getListPostbottom() {

    return  async (dispatch)  => {
            const   data = query(collection(db,process.env.REACT_APP_HOME_CALL), where("section","==", "topview"));
            const response  =  await getDocs(data);
            if(response.empty)
                return

            response.forEach(doc => {
                console.log(doc.data());
            })
            
    }
}




export function  formation(datas){
return  datas = datas.charAt(0).toUpperCase() + datas.slice(1); 
}




export function getUserAuth(data){
    return(dispatch)=> {
            auth.onAuthStateChanged(async (use) => {
                if(use)
                    dispatch(setUser(use)) 
            });
             if(data)
                dispatch(setFBUSER(app(data)))                
    };
};


export function app(es){
   return JSON.parse(es)
}






export  function updatePostlikes(count,likes,views,email,doc_id_a,doc_id_b){
    axios.post(process.env.REACT_APP_THUMBS_REACTION_CALL, likes !== 0 ? {User:{useremail:email},UserPost:{likes:count, doc_id_a:doc_id_a, doc_id_b:doc_id_b}} : {User:{useremail:email},UserPost:{likes:0,views:count, doc_id_a:doc_id_a, doc_id_b:doc_id_b}})
    .then(res => {
         //console.log(res);
    }).catch(err => {
        console.log(err);
    })
    
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



