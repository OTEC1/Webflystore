import { React, useState } from "react";
import Loader from "react-loader-spinner";
import { connect } from 'react-redux';
import styled from "styled-components";
import {getListPostTop} from '../actions'; 
import Sliderframe from "./Sliderframe";


const   Middle =  (props) => {


    const [weekly, setweekly]  = useState('Weekly Giveaway Shop 5 item and get one free 💕');


    useState(() => {
        props.LoadPost();
    },[])

  
    return (
        <Component>
               {props.post1 !== null ? <Sliderframe post1={props.post1} /> : <div id="home"><Loader type="Oval"  color="#006eff"/></div>}
               <MiddleBottom>
                    <div>{weekly}</div>
               </MiddleBottom>
               <h5>FEATURED PRODUCTS</h5>
        </Component>
    )
}



const Component = styled.div`
#home{
height: 50vh;
width: 100%;
text-align:center;
margin-top:20%;
padding-bottom:00px;
}



h5{
text-align:center;
font-weight:900;
font-family: "Poppins", sans-serif;  
padding-top:100px;
}


@media(max-width:768px){
h5{
bottom:0px;
}
#home{
margin-top:45vh;    
}    
}


`;


const MiddleBottom = styled.div`
height: 200px;
min-height:200px;
width: 100%;
background: #ffffff;
padding-top:100px;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
font-size:30pt;



div{
width: 60%;
text-align:center;
font-weight:900;
font-family: "Poppins", sans-serif;
margin-left:auto;
margin-right:auto;
padding-top:50px;
}



@media(max-width:768px){
margin-top:220px;
font-size:20pt;


div{
width: 80%;
font-weight:700;
padding-top:30px;
}

}


`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        post1: state.postState1.post1
    }
}


const mapDispatcheToProps = (dispatch) => ({
    LoadPost: (e) =>  dispatch(getListPostTop()),
})

export default connect(mapStateToProps,mapDispatcheToProps)(Middle);