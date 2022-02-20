import { connect } from "react-redux";
import styled from "styled-components";
import {formation,SUM,RUNCHEK,addtocart} from '../actions'
import {Ri4KLine, RiAddBoxLine, RiAddCircleFill, RiAddCircleLine, RiBankCard2Line,RiCloseCircleFill,RiCloseCircleLine, RiFileReduceLine, RiLineLine, RiPulseLine, RiTakeawayLine} from 'react-icons/ri'


const CartDiv = (props) => {


    const closeCartView = (v) => {
        props.openCart(v);
    }




    let sessioncart = [];
    const Delete_Update = (id,list,index) => {
       
    sessioncart = [];

    for(let y=0; y<list.length; y++)
        if(id === list[y].item_id)
            if(index ===1)
               var e = list.splice(y,1);

               else if(index === 2 ){
                        if( list[y].quantity < 100)
                                list[y].quantity++;
                
               }else if(index === 3)
                    if( list[y].quantity > 1)
                            list[y].quantity--; 

            if(list){
                    for(var n=0; n <= list.length; n++)
                            if(list[n] != null && list[n] != undefined)
                                sessioncart.push(list[n]);

                localStorage.setItem("cart",JSON.stringify(sessioncart));
                props.addtocart(); 
                console.log(list) 
            }

            

    }









    return(
        <>
        {props.isopen === "open" ?
            <Container>
                <div id="topSection">
                    <button id="close" onClick={(e) => closeCartView(e)}>X</button>
                    <label>
                       My  Cart
                    </label>
                </div>

                <Items>
                    { props.cart  ? JSON.parse(props.cart).map((v,i) => 
                         <ItemsInside>
                                    <table>
                                        <tr>
                                            <td>
                                            <RiCloseCircleFill color="#8CC5F1"  onClick={(e) => Delete_Update(v.item_id,JSON.parse(props.cart),1)} id="remove"/>
                                            <img src={v.img_url} /> 
                                               
                                            </td>
                                        </tr>
                                        </table>



                                        <table>
                                        <tr>
                                            <td>
                                                <h3>{formation(v.name)}</h3>
                                            </td>
                                        </tr>

                                        
                                        <tr>
                                            <td>
                                                <RiAddCircleFill  size={25}  color="#8CC5F1"  onClick={(e) => Delete_Update(v.item_id,JSON.parse(props.cart),2)} />  &nbsp;&nbsp;   <h4 onClick={(e) => Delete_Update(v.item_id,JSON.parse(props.cart),3)}>-</h4>
                                            </td>
                                        </tr>


                                        <tr>
                                            <td>
                                                <label>Qty: {v.quantity}</label>
                                            </td>
                                        </tr>


                                        <tr>
                                            <td>
                                                <label>Total: ${v.price}</label>
                                            </td>
                                        </tr>

                                    </table>
                                    
                                </ItemsInside>) : ""}
                           </Items>

                            <SubTotal>
                                <h5>Sub Total:  &nbsp; &nbsp;  ${SUM(JSON.parse(props.cart))}</h5>
                                <h5>Tax:  {RUNCHEK()}</h5>
                                <button id="checkout">Checkout  &nbsp;&nbsp; <RiBankCard2Line id="card" size="20"  color="#000"/></button>
                            </SubTotal>
            </Container>
            : ""
         }
      </>
    )
}


const Container = styled.div`
position: absolute;
right: 0;
width: 25%;
height: 100vh;
background: #f5f5f5;
z-index:999999;



#topSection{
display:flex;
justify-content:space-between;
border-bottom:1px solid #000;

#close{
margin: 15px;
}

label{
font-weight:800;
margin: 15px;
font-family: "Poppins", sans-serif;
flex-grow:1;
text-align:center;
}

}

@media(max-width:768px){
width: 100%;
}

`;


const Items = styled.div`
width: 100%;
height: 70vh;
overflow-x:hidden;
overflow-y:scroll;

::-webkit-scrollbar {
display: none;
}

`;





const ItemsInside  =  styled.div`
display: flex;
margin-top:45px;
font-family: "Poppins", sans-serif;
flex-direction:column;
position: relative;




img{
width: 300px;
max-width:300px;
min-width:300px;
height: 170px;
object-fit:cover;
}


tr td{
display: flex;
justify-content:space-evenly;


h4{
cursor:pointer;
border-radius:50%;
height: 22px;
width:20px;
text-align:center;
color: #fff;
background: #8CC5F1;
}


h3{
margin-top: 5px;
margin-bottom:5px;
}

}



#remove{
position: absolute;
right: 0;
padding: 7px;
height: 30px;
width: 30px;
margin-top:-27px;
}


label{
font-size:9pt; 
}


@media(max-width:768px){
flex-direction:column;
flex: wrap;

img{
width: 100%;
max-width:100%;
min-width:100%;
}

tr td{
justify-content:space-evenly;
text-align:left;
}
}
`;



const SubTotal = styled.div`

h5{
margin:20px;
}

#checkout{
display: flex;
align-items:center;
justify-content:center;
text-align:center;
width: 90%;
color:#000;
margin:auto;
padding-bottom: 7px;
padding-top:5px;
text-transform: uppercase;
border-radius: 1 solid #000;
}
`;


const mapStateToProps = (state) => {

    return{
            user: state.userState.user,
            cart:state.cartState.cart,
    }

}


const mapDispatchStatetoProps = (dispatch) => ({
addtocart : (e) => { dispatch(addtocart(localStorage.getItem("cart")))}
})


export default connect(mapStateToProps,mapDispatchStatetoProps)(CartDiv);

