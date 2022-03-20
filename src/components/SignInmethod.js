import styled from "styled-components";
import { connect } from 'react-redux';
import FacebookProvider, {Login} from 'react-facebook-sdk'
import {RiFacebookBoxFill, RiGoogleFill} from 'react-icons/ri'
import {signOutGoogleApi,getUserAuth, signInAPIGoogle,signInfacebookApi,handleError}  from  '../actions'
import axios from "axios";


const SignInMethod = (props) => {

    const reset =  (e) => {
        props.sendRequestToModel(e);
    };

    const logout = (e) => {
        props.sendRequestToModel(e);
        props.signInAPIGoogle(2);
    }


    const auth = (e,n) => {
        var data =  props.loginstate;
        if(n === "G"){
            if(data === "Login")
                props.signInAPIGoogle(1);
            else
                props.signInAPIGoogle(2); 
        }
        props.sendRequestToModel(e);    
    }




  


    return<>
        {props.showModel === "open" ? (
        <Container>
            <table>
                <tr>
                    <td>
                        Sign in via    
                        <FacebookProvider appId={process.env.REACT_APP_FBID}>
                            <Login
                                scope={process.env.REACT_APP_SCOPE}
                                onResponse={signInfacebookApi}
                                onError={handleError}>
                                 <div id="ekene">
                                  <RiFacebookBoxFill  onClick={(e) => auth(e,"F")}   color='#8CC5F1'/>
                                 </div>
                            </Login>
                        </FacebookProvider>

                    </td>
                   </tr>
                    <tr>
                        <td>
                            Sign in via     
                            <RiGoogleFill  size={35}  onClick={(e) => auth(e,"G")} color='#8CC5F1' />
                        </td>
                     </tr>

                    <tr>
                        <td>
                           <button  onClick={(e) => logout(e)}>Logout</button>     
                        </td>
                    </tr>

            </table>
        </Container>
         ) : "" }
    </>
}



const Container = styled.div`
width: 100%;
height: 100vh;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
font-family: "Poppins", sans-serif;
background-color: rgba(0,0,0,0.8);
display: flex;



#ekene{
font-size:35px;
}


table{
background: #f5f5f5;
width:30%;
height:100px;
padding-top:100px;
padding-bottom:100px;
margin-left:auto;
margin-right:auto;
border-radius:10px;
margin-top:100px;
}


tr td{
display:  flex;
justify-content:space-between;
padding: 30px;
font-size:20pt;
font-weight:800;
cursor: pointer;

img{
width: 50px;
height: 50px;
}

}

@media(max-width:768px){
width: 100%;
table{
background: #f5f5f5;
width:70%;
height: 120px;
margin-top:150px;
padding-top:20px;
padding-bottom:10px;
}


tr td{
font-size:10pt;
align-items:center;
}


`;

const mapStateToProps = (state) => {
    return{
        user: state.userState.user,
        cart:state.cartState.cart,
    };
};

const mapDispatchToProps = dispatch => ({
    signInAPIGoogle: (e) => { e == 1 ? dispatch(signInAPIGoogle()) : dispatch(signOutGoogleApi()) },
});


export default connect(mapStateToProps,mapDispatchToProps)(SignInMethod);