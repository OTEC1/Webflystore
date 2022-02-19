import { connect } from "react-redux";
import styled from "styled-components";
import {formation} from '../actions'


const CartDiv = (props) => {


    const closeCartView = (v) => {
        props.openCart(v);
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
                    { props.cart  ? JSON.parse(props.cart).map((v,i) => <ItemsInside>
                                                            <table>

                                                             


                                                                <tr>
                                                                    <td>
                                                                      <img src={"/"+v.img_url} /> 
                                                                    </td>
                                                                </tr>
                                                                </table>



                                                                <table>
                                                                <tr>
                                                                    <td>
                                                                        <button id="remove">x</button>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td>
                                                                      <h3>{formation(v.name)}</h3>
                                                                    </td>
                                                                </tr>

                                                               


                                                                <tr>
                                                                    <td>
                                                                     <button>+</button>   <button>-</button>
                                                                    </td>
                                                                </tr>

                                                            

                                                                <tr>
                                                                    <td>
                                                                        <label>Qty: 7</label>
                                                                    </td>
                                                                </tr>


                                                                <tr>
                                                                    <td>
                                                                        <label>Total: 7</label>
                                                                    </td>
                                                                </tr>

                                                            </table>
                                                            
                                                     </ItemsInside>) : ""}

                </Items>

            </Container>
            : ""
         }
      </>
    )
}


const Container = styled.div`
position: absolute;
right: 0;
width: 30%;
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
height: 90vh;
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




img{
width: 300px;
max-width:300px;
min-width:300px;
height: 170px;
object-fit:cover;
}

tr td{
display: flex;
justify-content:space-between;

button{
cursor:pointer;
border-radius:50%;
padding: 3px;
border: none;
height: 25px;
width: 25px;
font-weight:700;
}

h3{
margin-top: 5px;
margin-bottom:5px;
}
}

#remove{
margin-left:auto;
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
justify-content:left;

button{
margin: 10px;
}

h3{
margin-left:12px;
}

label{
margin-left:12px;
}

}
}
`;

const mapStateToProps = (state) => {

    return{
            user: state.userState.user,
            cart:state.cartState.cart,
    }

}

export default connect(mapStateToProps)(CartDiv);