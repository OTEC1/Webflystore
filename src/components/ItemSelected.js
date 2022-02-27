import React, { useState } from 'react'
import  styled from 'styled-components'
import { connect } from 'react-redux';
import { useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Item from './Item'
import db from '../firebase';
import { doc, getDoc } from "firebase/firestore/lite";
import { getListPostTop } from '../actions';



const Itemselected = (props) => {

const [datas, setDatas] = useState([]);
const  {frame, option} = useParams();


useEffect(() => {
window.scrollTo(0,0);
runnquery();
props.LoadPost();
let list = [frame,option];
sessionStorage.setItem("lastDoc",JSON.stringify(list));
},[frame])






async function runnquery(){
     const docRef = doc(db, "Webflystore1", frame);
     const docSnap = await getDoc(docRef);
     if (docSnap.exists()) 
         setDatas(docSnap.data())
      else 
        alert("Network Error timedout")
     
}

 return( datas ? <Item  dataPass={datas} id={frame} model={option}   cachellist={props.post1}/> : "Loading...")

}



const mapStateToProps = (state) => {
     return {
          user: state.userState.user,
          post1: state.postState1.post1,
     }
}


const mapDispatchStatetoProps = (dispatch) => ({
     LoadPost: (e) => dispatch(getListPostTop())
     
})

export default connect(mapStateToProps,mapDispatchStatetoProps)(Itemselected)
