import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import {CloudinaryContext, Image} from 'cloudinary-react'
import { Currency, SUM } from '../actions';
import { useNavigate } from 'react-router-dom';
import NextStep from './NextStep';

const Shipping = (props) =>{

  const [empty, setempty] = useState(true);
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setcity] = useState('');
  const [country, setcountry] = useState('');
  const [state, setstate] = useState('');
  const [phone, setPhone] = useState('');
  const [postal, setPostal] = useState('');
  const [email, setEmail] = useState('');
  const [inpusts, setinputs] = useState(0);
  const history = useNavigate();




  useEffect(() => {
   if(Fname.length > 0 && Lname.length > 0  && address.length > 0  && city.length > 0
           && postal.length > 0 && phone.length > 0 &&  email.length > 0 ){
         setempty(false); SAVE(1);
   }else 
         setempty(true);
  },[inpusts])

  useEffect(() => GET(),[]);


  const SaveIfValid = () => {
    if(Fname.length > 0 && Lname.length > 0  && address.length > 0  && city.length > 0 
             && postal.length > 0 && phone.length > 0  &&  email.length > 0)
               SAVE(2)

  }


  const SAVE = (n) => {
    let list = [Fname,Lname,address,city,country,state,phone,postal,email];
        if(n === 1)
            sessionStorage.setItem("buyersessiondetails", JSON.stringify(list));
        else
            localStorage.setItem("buyervalutdetails", JSON.stringify(list));
        
  }


  const GET = () => {
      let list = JSON.parse(sessionStorage.getItem("buyersessiondetails"));
         if(list){
                setempty(false);
                setFname(list[0]);
                setLname(list[1]);
                setAddress(list[2]);
                setcity(list[3]);
                setPhone(list[6]);
                setPostal(list[7]);
                setEmail(list[8]); 
         }     
  }

  
  const selectLocation = () => {
    if(Fname.length > 0 && Lname.length > 0  && address.length > 0  && city.length > 0 && postal.length > 0 && phone.length > 0 )
            history("/shippingcost")
    else
        alert("Pls fill out shipping details ! ")
  }



  return (
    <Container>
         <h5>Shipping details </h5>

         <div>
            <Address>
                

                    <div id='SecondSectionmail'>
                         <input id='email' placeholder="Email"  value={email} onChange={(e)=> { setEmail(e.target.value);  setinputs(inpusts +1) } }/>  
                        
                          <div id='details_saver'>
                              <input type="checkbox" onChange={(e) => SaveIfValid()}/> <label>Save my details</label>  
                          </div>  
                    </div>

                    <div id='TopSection'>
                      <input placeholder='First name'  value={Fname} onChange={(e)=> { setFname(e.target.value); setinputs(inpusts +1) } }/>    <input placeholder='Last name'   value={Lname} onChange={(e)=>{ setLname(e.target.value); setinputs(inpusts +1) } }/>  
                    </div>
                    

                    <div id='SecondSection'>
                       <input placeholder="Address"   value={address} onChange={(e)=>{ setAddress(e.target.value); setinputs(inpusts +1) } }/>      
                    </div>

                    <div id='SecondSection'>
                         <input placeholder="City"  value={city} onChange={(e)=> { setcity(e.target.value);  setinputs(inpusts +1) } }/>  
                    </div>
                


                    <div id='MidSection'>
                         <select>
                            <option>
                                Country
                            </option>     
                         </select>  


                         <select>
                            <option>
                                State
                            </option>     
                         </select> 


                         <input placeholder="Postal Code"  value={postal} onChange={(e)=> {setPostal(e.target.value); setinputs(inpusts +1)} }/>

                    </div>
                         

                       <div id='SecondSection'>
                        <input placeholder='Phone' value={phone}  onChange={(e) => { setPhone(e.target.value); setinputs(inpusts +1) } }/>
                        </div>  

                        <NextStep empty={empty ? true : false}   call={1}  saved={localStorage.getItem("buyervalutdetails") ? true : false} fun={selectLocation} info1="Use saved details"  info2="Continue to Shipping method" />

                          
            
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
                        
                    ): ""
                    }
                   
                </div>

                <div id='lineSperator'></div>

                <SubTotalSection>
                    
                    <div  id='Subtotal'>
                        <h5>SubTotal:</h5>    <h2>{Currency()+ SUM(JSON.parse(localStorage.getItem("cart")))}</h2>
                    </div>

                    <div id='Subtotal2'>
                        <h5>Shipping:</h5>     <h4>caclulated at next step</h4>
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
div{
display: block;   
overflow: scroll;

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



#SecondSection{
display: flex;
width: 100%;
height: 50px;
margin: 10px;
display: flex;
justify-content:space-around;
input{
width: 90%;
}
}



#SecondSectionmail{
display: flex;
width: 100%;
height: 50px;
margin: 10px;
display: flex;
justify-content:space-around;
#email{
width: 67%;
margin-left:10px;
}

#details_saver{
width: 20%;
display: flex;
font-size:9pt;
padding: 10px;

label{
margin-top:3px;
}

}

}


#MidSection{
display: flex;
width: 100%;
height: 50px;
margin: 10px;
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
height: 700px;
min-height:700px;
max-height:700px;
overflow-y: hidden;





#TopSection{
display: flex;
flex-direction:column;
height: 120px;
min-height:120px;
input{
width: 85%;
min-width:85%;
padding: 15px;
}
}



#SecondSection{
margin: 0px;
height: 60px;

input{
width: 89%;
margin-left:4px;
margin-right:4px;
margin-top:12px;
}

}

#MidSection{
height: 150px;
margin: 0px;
flex-wrap:wrap;
width:100%;
select{
width: 95%;
max-width:95%;
min-width:95%;
padding: 10px;
margin-top:5px;
}

input{
width: 90%;
max-width:90%;
min-width:90%;
margin-top:5px;
}

}


#details_saver{
padding: 1px;
label{
margin-top:0px;
font-size:7pt;
}

}

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
min-width: 80%;
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
padding: 0px;
margin:0px;

#DisplayList{
width: 100%;
min-width:100%;
margin-left:0px;
height: 200px;


::-webkit-scrollbar {
display: none;
}

#HouseOrders{
min-height:100px;
height: 100px;
min-width: 100%;
width: 100%;
margin:0px;


::-webkit-scrollbar {
display: none;
}


h4{
margin-right:10px;
}


#HouseImg_{
width: 40%;
min-width:40%;
padding: 10px;
margin-top:10px;
position: relative;


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

`;





const mapStateToProps = (state) => {

    return{
            user: state.userState.user,
            cart:state.cartState.cart,
    }

}


const mapDispatchStatetoProps = (dispatch) => ({})


export default connect(mapStateToProps,mapDispatchStatetoProps)(Shipping);