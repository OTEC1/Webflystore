import React, { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import {SUM2} from '../actions'
import {v4 as uuid4}  from 'uuid';

function NextStep(props) {
    const history = useNavigate();
    const [load, setLoad] = useState(false);
     
    const checkfunction = () => {
        if(props.call == 1){
            props.fun();
            window.scrollTo(0,0);
        }else if(props.call == 2) {
            setLoad(true);
            sessionStorage.setItem("order_id",uuid4());
            initPayment(SUM2(JSON.parse(localStorage.getItem("cart")),parseInt(sessionStorage.getItem("locationPrice"))));
        }
         
    } 

    const initPayment = (payload) => {
        axios.post(process.env.REACT_APP_ENDPOINT,
            {Store:'Webflystore',data: payload, line1: JSON.parse(sessionStorage.getItem("buyersessiondetails"))[2], 
                  line2: JSON.parse(sessionStorage.getItem("buyersessiondetails"))[3],
                        mail:JSON.parse(sessionStorage.getItem("buyersessiondetails"))[8],order_id:sessionStorage.getItem("order_id"),
                            postalcode:JSON.parse(sessionStorage.getItem("buyersessiondetails"))[7]})
            .then(res => {
                    window.location.href = res.data;
                    setLoad(false)
            }).catch(err =>{
                console.log(err)
            })

    }
    

    const Navigate = () => {

        if(props.call == 1)
            history("/model/"+DOC([0])+"/"+DOC([1]))
        else
            history("/shipping")
    }

    function DOC(n){
       return JSON.parse(sessionStorage.getItem("lastDoc"))[n];
    }

  return (
         <NextSteps empty={props.empty}>
            <button id='btn1' onClick={(e) => Navigate()}> &#8592;  {props.info1}</button>
            {props.saved ? <button id='btn3' onClick={(e) => checkfunction()}>Use saved details</button> : ""}
            <button  id='btn2' onClick={(e) => checkfunction()}>
                {load ? <div><Loader type="Oval"  color="#fff"  height={20}  width={20} /></div>
                : props.info2} 
           </button>
        </NextSteps>
  
  )
}




const NextSteps = styled.div`
display: flex;
width: 100%;
height: 50px;
max-height:50px;  
justify-content:space-between;
margin-top:25px;


#btn1{
margin-left:30px;
background: none;
border: none;
font-weight:650;
font-family: "Poppins", sans-serif;
cursor: pointer;
&:hover{
background:rgba(0,0,0,0.08);
border-radius:5px;
}
}


#btn2{
height:50px;
width: auto;
min-width:200px;
max-width:200px;
margin-right:15px;
border-radius:5px;
font-family: "Poppins", sans-serif;
color: #fff;
border: none;
cursor: pointer;
font-size:8pt;
background: ${(props) => (props.empty ?  "#f5f5f5" : "#EC9335")};
color: ${(props) => (props.empty ? "rgba(1,1,1,0.2)": "white")};
&:hover{
background: ${(props) => (props.empty ? "rgba(0,0,0,0.08)" : "#BA5833")};
}
div{
margin: 0 auto;
width:50px;
height:100%;
display:flex;
align-items:center;
justify-content:center;
}
}

#btn3{
height:50px;
margin-right:15px;
border-radius:5px;
font-family: "Poppins", sans-serif;
color: #fff;
border: none;
cursor: pointer;
background:#EC9335;
}



@media(max-width:768px){
height: 200px;
min-height:200px;
overflow-x:hidden;

#btn1{
margin-left:0px;
width: 90%;
padding: 10px;
}

#btn2{
height:50px;
margin-right:0px;
font-size:9pt;
padding: 3px;
width: 90%;
margin-top:15px;
}


#btn3{
height:50px;
margin-right:0px;
font-size:9pt;
padding: 3px;
width: 50%;
margin-top:15px;
}

}
`;

export default NextStep