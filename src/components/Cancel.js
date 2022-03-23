import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

function Cancel() {

  const history = useNavigate();
  return (
    <Container>
      <Div>
        <h5>Payment was canceled</h5>
        <button onClick={(e) => history("/shipping")}> &#8592; Return to cart</button>
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
}
`;

export default Cancel