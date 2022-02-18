import React, { useState } from 'react'
import  styled from 'styled-components'
import { connect } from 'react-redux';
import { useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Item from './Item'
import db from '../firebase';
import { doc, getDoc } from "firebase/firestore/lite";



const Itemselected = (props) => {

const [datas, setDatas] = useState([]);
const  {frame, option} = useParams();


useEffect(() => {
window.scrollTo(0,0);
runnquery();

},[])




async function runnquery(){
     const docRef = doc(db, "Webflystore1", frame);
     const docSnap = await getDoc(docRef);
     if (docSnap.exists()) 
         setDatas(docSnap.data())
      else 
        alert("Network Error timedout")
     
}

 return( <Item  dataPass={datas} id={frame} model={option} />)

}



const mapStateToProps = (state) => {
     return {
          user: state.userState.user,
     }
}


const mapDispatchStatetoProps = (dispatch) => ({

})

export default connect(mapStateToProps,mapDispatchStatetoProps)(Itemselected)
