import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import {CloudinaryContext, Image} from 'cloudinary-react'
import { Currency, SUM, LoadLocations,SUM2} from '../actions';
import { useNavigate } from 'react-router-dom';
import db from '../firebase';
import { collection,getDocs,query} from 'firebase/firestore/lite';
import { async } from '@firebase/util';
import NextStep from './NextStep';

const ShippingCost = (props) =>{

  const [empty, setempty] = useState(true);
  const [options, setOptions] = useState([]);
  const [location, setlocation] = useState(0);
  const [radio, setRadio] = useState(1000);
  const [local, setlocal] = useState(0);
  const [total, setTotal] = useState(0);
  const [locality, setlocality] = useState('');

  const history = useNavigate();
 

  let list = []

  useEffect( () => {
    props.LoadLocations();
    setOptions(props.locations);
  },[props.locations])


  const column = (n,price,local) => {
    setTotal(SUM2(JSON.parse(localStorage.getItem("cart")),price));
    setRadio(n); setlocal(price); setempty(false);  setlocality(local); sessionStorage.setItem("locationPrice",price);
  }
  const Return2details = () => {
      history("/shipping");
  }

  return (
    <Container>
         <h5>Verify details</h5>
         <div>
            <Address>
               
                  <div id='LocationDetails'>

                     <div id='SecondSectionmail'>  
                                <table>
                                     <tbody>
                                                <tr>
                                                    <td>
                                                        Contact  &nbsp;&nbsp;&nbsp;&nbsp;  {JSON.parse(sessionStorage.getItem("buyersessiondetails")) ? JSON.parse(sessionStorage.getItem("buyersessiondetails"))[8] : ""}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Ship to: {  
                                                        JSON.parse(sessionStorage.getItem("buyersessiondetails")) ? 
                                                            JSON.parse(sessionStorage.getItem("buyersessiondetails")).map((v,i) => i !== 8 ? <label>{v}</label> : "" )
                                                            : ""
                                                            } 
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        Method: 
                                                        &nbsp; &nbsp; &nbsp;
                                                        <span>
                                                         {locality} 
                                                        </span>
                                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                            </div>
                    </div>
                    
                    
                    <div id='Location'>
                         <div id='shipping_method'>
                            Shipping method
                         </div>
                         {options != null ? options.map((v,i) => <Cards> <input  type="radio" checked={ radio === i ? true : false} onChange={(e) => column(i,v.Price,v.location1)} /> <span>{v.location1}</span> &nbsp;&nbsp;  <label>{Currency() + v.Price}</label> </Cards>) : "Loading..." } 
                    </div>
                    

                    <NextStep empty={empty ? true : false} call={empty ? 0 : 2}  fun1={Return2details} info1="Return to customer information"  info2="Continue to payment method" />

            </Address>


            <CartTotal>
                <div id='DisplayList'>
                    {localStorage.getItem("cart")  ? JSON.parse(localStorage.getItem("cart")).map((v,i) => 
                            <div id='HouseOrders'>
                                <div id='HouseImg_'>
                                    <CloudinaryContext cloudName="otecdealings">
                                        <Image publicId={"Kokocarft/"+v.img_url+".jpg"}/>
                                    </CloudinaryContext>
                                    <h5>{v.quantity}</h5>
                                    <h3>{v.name}</h3>
                                </div>
                                <h4>{Currency() + v.price}</h4>
                            </div>
                        
                      ) : ""
                    }  
                </div>

                <div id='lineSperator'></div>
                <SubTotalSection>
                    <div  id='Subtotal'>
                        <h5>SubTotal:</h5>    <h2>{Currency()+ SUM(JSON.parse(localStorage.getItem("cart")))}</h2>
                    </div>

                    <div id='Subtotal2'>
                        <h5>Shipping:</h5>     <h4>{ Currency()+local}</h4>
                    </div>
                        

                    <div  id='Subtotal'>
                        <h5>Total:</h5>    <h2>{Currency()+ total}</h2>
                    </div>
            
                </SubTotalSection>

            </CartTotal>
         </div>
     

    </Container>
  )

}


const Container = styled.div`
width: 90%;
height: 100vh;
font-family: "Poppins", sans-serif;
margin-top:100px;
margin-left:auto;
margin-right:auto;
text-align:center;
padding-bottom:100px;


h5{
padding:10px;
}


div{
display: flex;
flex: wrap;
width: 100%;
height: 100vh;
}


@media(max-width:768px){
width:100%;
max-width:100%;
min-width:100%;
height: auto;
min-height:auto;
overflow-x: hidden;

div{
display: block;   
overflow-y: scroll;
overflow-x: hidden;
}
}

`;



const Address = styled.div`
width: 45%;
height: 550px;
max-height:550px;
background: #fff;
border-radius:20px;
margin-top:10px;
margin: 10px;
display: flex;
flex-direction:column;
padding-top:30px;
padding-bottom:20px;


#LocationDetails{
overflow: scroll;
width: 100%;
max-width:100%;
height: 30%;
display: flex;
flex-direction:column;
align-items:center;

::-webkit-scrollbar {
display: none;
}


#SecondSectionmail{
display: flex;
width: 90%;
height: auto;
min-height:auto;
margin-top: 20px;
display: flex;
justify-content:space-around;
border:0.5px solid #E6E6E6;
border-radius:10px;

table{
width: 100%;
min-width:100%;

tr td{
text-align:left;
font-size:9pt;
padding: 5px;
}

label{
margin: 5px;
}

span{
float: right;
width: 85%;
min-width:85%;
}
}


}



}

#Location{
overflow: scroll;
width: 100%;
max-width:100%;
height: 60%;
display: flex;
flex-direction:column;
align-items:center;


::-webkit-scrollbar {
display: none;
}
}


input{
border-radius:5px;
padding: 10px;
border-radius:7px;
border:0.5px solid #E6E6E6;
}

#TopSection{
display: flex;
width: 100%;
height: 50px;
margin: 10px;
display: flex;
justify-content:space-around;
input{
width: 40%;
}
}


#shipping_method{
margin:10px;
width: 90%;
min-width:90%;
height: 200px;
padding: 20px;
text-align:center;
}



#MidSection{
display: flex;
width: 100%;
height: 50px;
margin: 10px;
display: flex;
justify-content:space-around;

select{
width: 25%;
border-radius: 5px;
border:0.5px solid #E6E6E6;
}
}




@media(max-width:768px){
width:100%;
min-width:100%;
margin: 0px;
height: 900px;
min-height:900px;
max-height:900px;
overflow-y: scroll;
overflow-x: hidden;

#shipping_method{
height: 20px;
max-height:20px;
padding: 20px;
text-align:center;
padding-bottom:50px;
}

}


#SecondSectionmail{
height: 45px;
min-height:45px;
overflow: hidden;
}


#Location{
overflow-x: hidden;
}
`;





const CartTotal = styled.div`
width: 45%;
height: 580px;
max-height:580px;
background: blue;
border-radius:20px;
margin-top:10px;
background: #f5f5f5;
display: flex;
flex-direction:column;
padding-bottom:20px;







#DisplayList{
width: 80%;
min-width:80%;
min-height:250px;
height: 250px;
display: flex;
flex-direction: column;
overflow: scroll;
margin-left:35px;
margin-top:30px;


::-webkit-scrollbar {
display: none;
}



#HouseOrders{
min-height:100px;
height: 100px;
width: 80%;
width: 80%;
margin:10px;
display: flex;
align-items:center;
justify-content:space-between;


h4{
padding: 5px;
}

#HouseImg_{
height: 100%;
min-height:100%;
width: 25%;
position: relative;

h5{
position: absolute;
margin-top:-10px;
margin-right:10px;
background: #919191;
border-radius:100%;
padding: 10px;
right:0;
font-size:8pt;
height: 12px;
width: 10px;
color: #fff;
}


h3{
margin-left:15px;
margin-top:25px;
font-size:9pt;
white-space: nowrap ;
}

img{
width: 80px;
height: 90px;
object-fit:cover;
background: #fff;
padding: 5px;
border-radius:10px;
}

}
}
}



#lineSperator{
background: #919191;
width: 80%;
min-width:80%;
min-height:1px;
height: 1px;
margin-top:10px;
margin-left:auto;
margin-right:auto;
}




@media(max-width:768px){
width:100%;
min-width:100%;



#DisplayList{

    
#HouseOrders{
width: 90%;


#HouseImg_{
max-height:100px;
overflow: hidden;
width: 50%;
min-width:50%;

::-webkit-scrollbar {
display: none;
}

img{
width: 90px;
min-width:90px;
height: 80px;
max-height:80px;
object-fit:cover;
background: #fff;
padding: 5px;
border-radius:10px;
}


}

}

}

}
`;





const SubTotalSection = styled.div`
display: flex;
flex-direction:column;
text-align:left;
width: 85%;
min-width:85%;
max-width:85%;
margin-left:auto;
margin-right:auto;
margin-top:50px;

#Subtotal{
width: 100%;
height: 50px;
justify-content:space-between;
align-items:center;
padding: 10px;
font-size:10pt;

h2{
margin-right:30px;   
font-weight:700;
font-size:15pt;

}

}


#Subtotal2{
width: 100%;
height: 50px;
justify-content:space-between;
padding: 10px;
font-size:10pt;
align-items:center;
h4{
margin-right:30px;   
}
}


@media(max-width:768px){
flex-direction:row;
#Subtotal{
padding: 10px;
display: flex;
}


#Subtotal2{
display: flex;
}

}

`;



const Cards = styled.div`
width: 90%;
max-width:90%;
min-height:100px;
height: 100px;
max-height:100px;
border:0.5px solid #E6E6E6;
display: flex;
border-radius:10px;
justify-content:center;
align-items:center;
text-align:left;
margin: 5px;
padding: 10px;
span{
font-size:9pt;
}
`;




const mapStateToProps = (state) => {

    return{
            user: state.userState.user,
            cart:state.cartState.cart,
            locations:state.locationstate.locations,
    }

}


const mapDispatchStatetoProps = (dispatch) => ({
    LoadLocations: () => dispatch(LoadLocations())
})


export default connect(mapStateToProps,mapDispatchStatetoProps)(ShippingCost);