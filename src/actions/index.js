import {auth, provider, signInWithPopup}  from '../firebase';
import { collection,getDocs, where, query, setDoc,doc,orderBy, serverTimestamp} from 'firebase/firestore/lite';
import { SET_USER ,SET_PROMISE, GET_POSTS1, GET_POSTS2, CART_ORDER, REVIEWS,Locations} from './actionType';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
import axios from 'axios';
import swal from 'sweetalert2'
import db from '../firebase';
import {v4 as uuid4}  from 'uuid';
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



export const reviewAdded = (payload) => ({
    type: REVIEWS,
    reviews: payload,
})


export const getloaction = (payload) => ({
    type: Locations,
    locations: payload,
})







export function signInfacebookApi(m){
    return (dispatch) => {
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
            dispatch(setUser(paid.user))
        })
        .catch((err) => alert(err.message))
    };
}





export function signOutGoogleApi(){
    console.log("Google");
    return (dispatch) => {
        auth.signOut().then(() => {
            window.sessionStorage("signInUser",null);
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
            const   data = query(collection(db,process.env.REACT_APP_HOME_CALL),orderBy("timestamp", "desc"));
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
            const   data = query(collection(db,process.env.REACT_APP_HOME_CALL), orderBy("timestamp", "desc"));
            const response  =  await getDocs(data);
            if(response.empty)
                return
           
            response.forEach(doc => {
                list.push(doc.data());
                dispatch(setPost2(list))
            })
            
    }
}




export function  getListReviews(doc_id) {
    let list = [];
    return  async (dispatch)  => {
            const   data = query(collection(db, process.env.REACT_APP_HOME_CALL+"/"+doc_id+"/"+process.env.REACT_APP_REVIEW), orderBy("timestamp", "desc"));
            const response  =  await getDocs(data);
            if(response.empty)
                dispatch(reviewAdded([]))
            else
                dispatch(reviewAdded([]))

            response.forEach(doc => {
                list.push(doc.data());
                dispatch(reviewAdded(list))
            })
          
            
    }
}










export function LoadLocations(){
    let list =  [];
    return  async (dispatch)  => {
        const data = query(collection(db, process.env.REACT_APP_SECTOR));
        const response  =  await getDocs(data);
            if(response.empty)
                return;
            response.forEach(doc => {
                list.push(doc.data());   
                dispatch(getloaction(list))  
            })
    }
      
}




export function getUserAuth(data){
    return (dispatch) => {
            auth.onAuthStateChanged(async (use) => {
                if(use){
                    window.sessionStorage.setItem("signInUser", use.email);
                    dispatch(setUser(use)) 
                }
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





export function sendIncart(cart,cartSessionId,id,userDetils){
    if(cart.length > 0)
        for(let n=0; n<cart.length; n++){
                setDoc(doc(collection(db, process.env.REACT_APP_CART+cartSessionId),uuid4()),{
                    name: cart[n].name,
                    img_url: cart[n].img_url,
                    quantity: cart[n].quantity,
                    doc_id: cart[n].doc_id,
                    item_id: cart[n].item_id,
                    price: cart[n].price,
                    email: "",
                    country:"",
                    state:"",
                    cartSessionId: id,
                    timestamp: serverTimestamp()
                });
             }
             
        if(cart.length > 0 && id.length > 0){

            setDoc(doc(collection(db, process.env.REACT_APP_CART1),id),{
                    order_id: id,
                    status: false,
                    email: cartSessionId,
                    timestamp: new Date().getTime(),
            });

            setDoc(doc(collection(db, process.env.REACT_APP_CART+cartSessionId),uuid4()),{
                name: userDetils[0],
                img_url: "",
                quantity: userDetils[1],
                doc_id: userDetils[2],
                item_id: userDetils[3],
                price: userDetils[6],
                email: userDetils[8],
                country: userDetils[5],
                state: userDetils[4],
                cartSessionId: id,
                timestamp: serverTimestamp()
            });

        }
}




export function RouterReview(doc_id,review,user) {
    setDoc(doc(collection(db, process.env.REACT_APP_HOME_CALL+"/"+doc_id+"/"+process.env.REACT_APP_REVIEW),uuid4()),{
        doc_id: doc_id,
        review: review,
        user: user,
        timestamp: new Date().getTime(),
});
}



export function Notify(payload){
    axios.post("https://us-central1-webflystore.cloudfunctions.net/webfly/paymentstatus",payload)
        .then(res => {
            console.log(res.data.message);
        }).catch(err => {
            console.log(err)
        });
    
}


export function  formation(datas){
    if(datas !== undefined && datas !== null)
      datas = datas.charAt(0).toUpperCase() + datas.slice(1); 
    else
        datas = datas;
      return datas;
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



export function SUM2(cart_list,n){
    let track=0,sum=0;
    if(cart_list){
        for(let n=0; n<cart_list.length; n++){
                track = cart_list[n].quantity *  cart_list[n].price;
                sum = sum + track;
        }
    }
    return sum+n;
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



