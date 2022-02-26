import React from 'react'
import styled from 'styled-components';

function NextStep(props) {

     
    const checkfunction = () => {
        if(props.call == 1){
            props.fun();
            window.screenTop(0,0);
        }else{
            props.fun1();
            window.screenTop(0,0);
        }
    } 

  return (
         <NextSte empty={props.empty}>
            <button id='btn1' > &#8592;  {props.info1}</button>
            {props.saved ? <button id='btn3'>Use saved details</button> : ""}
            <button  id='btn2' onClick={(e) => checkfunction()}>{props.info2} </button>
        </NextSte>
  
  )
}




const NextSte = styled.div`
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
margin-right:15px;
border-radius:5px;
font-family: "Poppins", sans-serif;
color: #fff;
border: none;
cursor: pointer;
background: ${(props) => (props.empty ?  "#f5f5f5" : "#EC9335")};
color: ${(props) => (props.empty ? "rgba(1,1,1,0.2)": "white")};
&:hover{
background: ${(props) => (props.empty ? "rgba(0,0,0,0.08)" : "#BA5833")};
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
width: 90%;
margin-top:15px;
}

}
`;

export default NextStep