import React, { useEffect } from 'react'
import styled from 'styled-components'
import {useNavigate, useParams} from 'react-router-dom'
import { Notify,sendIncart} from '../actions';
import {v4 as uuid4} from 'uuid'

function Capture(props) {

  const history = useNavigate();
  var url = new URL(window.location.href);
  var n = url.searchParams.get("n");

  useEffect(() => {
  
   let none_signin_user = uuid4();
        if(n === "COMPLETED" ){
            let cartstate = [];
            cartstate  = JSON.parse(localStorage.getItem("cart"));
            console.log(cartstate);
            for(let d=0; d<cartstate.length; d++){
                    if(d === 0){
                                let payload = {
                                    User:{
                                    to: sessionStorage.getItem("token"),
                                },
                                payload:{
                                    id: cartstate[d].name,
                                    email: props.user ? props.user.email :none_signin_user,
                                    item: "New Order",
                                    doc_id:cartstate[d].doc_id,
                                    pic: cartstate[d].img_url
                                },
                                options: {
                                    notification: {
                                    badge: 1,
                                    sound: "ping.aiff",
                                    body: cartstate[d].img_url,
                                    id: cartstate[d].doc_id,
                                    email: props.user ? props.user.email :none_signin_user,
                                    item: cartstate[d].name,
                                    pic: cartstate[d].img_url
                                    }
                                }
                            }
                        Notify(payload);
                    }
             }
            sendIncart(cartstate,props.user ? props.user.email :none_signin_user,sessionStorage.getItem("order_id")); 
        }
        localStorage.removeItem("cart");
     
     
  },[]);


  return (
    <Container>
      <Div>
        <h5>Payment Status has been sent to your email</h5>
        <button onClick={(e) => history("/")}> Go to homePage</button>
      </Div>
    </Container>
  )
}


const Container = styled.div`
width:100%;
height:100vh;
font-family: "Poppins", sans-serif;
`;


const Div = styled.div`
width:50%;
height: 70%;
margin-left:auto;
margin-right:auto;
margin-top:100px;
background:#fff;
border-radius:10px;
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
button{
width:200px;
background:#EC9335;
color:#fff;
border:none;
padding:10px;
border-radius:10px;
font-family: "Poppins", sans-serif;
cursor:pointer;
}
h5{
margin: 20px;
}

@media(max-width:768px){
width:90%;
text-align:center;
}

`;

export default Capture