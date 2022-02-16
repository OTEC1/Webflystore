import {React, useState ,useRef, useEffect} from 'react';
import styled from 'styled-components'
import {RiShoppingCartLine, RiAccountCircleFill, RiHome4Fill,RiCloseLine,RiSearch2Line,RiMenu3Line,RiAccountCircleLine, RiStore2Line,RiArrowRightCircleLine} from 'react-icons/ri'
import { useNavigate }  from 'react-router-dom'
import { connect } from 'react-redux';
import {signOutGoogleApi,getUserAuth, signInAPIGoogle}  from  '../actions'
import axios from 'axios';
import Swal from 'sweetalert2';


const  Header = (props) => {

    const [query, setQuery] = useState('');
    const [showdrawer, setshowdrawer] = useState(false);
    const [authen, setAuthen]= useState('Login');
    const history = useNavigate();



    

    useEffect(() => {
           if(sessionStorage.getItem("visitCount") === null) {
                sessionStorage.setItem("visitCount","visited");  
                //UPDATE();
            }
            window.addEventListener("beforeunload", (ev) => {  
               sessionStorage.setItem("visitCount",null);
            });
            getUserAuth(window.sessionStorage.getItem("fbuser"));
            sessionStorage.setItem("SignInUser",props.user.User ? JSON.stringify(props.user) : "")
    },[])


    
    const SortDiv = () => {

    } 

    const GetAlbumPlaylist = (e) => {

    }


    const SortByGenre = () => {

    }

    const GetDownloadHighCount = (e) => {

    }



    function UPDATE(){
        axios.post(process.env.REACT_APP_UPDATE_VISIT_COUNT,{count:1})
        .then(res => {
            console.log(res.data.message,"Here")
        }).catch(err => {
            console.log(err);
        })         
    }


    const homeNav = () => {
        history("/");
        window.scrollTo(0,0);
        sessionStorage.setItem("View","home");
    }

    const userNav = () => {
            history("/");
            window.scrollTo(0,0);
            sessionStorage.setItem("View","user");
    }


    const Streaming = () => {
        history("/");
        window.scrollTo(0,0);
        sessionStorage.setItem("View","streaming");
    }


    const Music = () => {
        history("/");
        window.scrollTo(0,0);
        sessionStorage.setItem("View","music");
    }

    

    const runquery = () => {
        if(sessionStorage.getItem("View") === "music")
            history("/musicquery/"+query.toLowerCase());
    }

    const auth = () => {
        var data = document.getElementById("authstate").innerText;
        if(data === "Login")
            props.signInAPIGoogle();         
    }


    function show(){
        setshowdrawer(true);
        window.scrollTo(0,0);
    }
  
    

    function buy() {
        
    }

    return (
        <>
        {showdrawer ? 
           <ShowDiv>
                <div  id='mainview'>
                    <button onClick={(e) => setshowdrawer(false)}><RiCloseLine/></button>
                    <Searchs>
                        <div>
                            <input placeholder='Search for products' value={query}  onChange={(e) => setQuery(e.target.value)} />
                        </div>
                        <SearchIcons onClick={(e) => runquery()}>
                            <RiSearch2Line
                                size={15}
                                color='#000'/>
                        </SearchIcons>
                    </Searchs>
                </div>   
           </ShowDiv>
           :
           ""}
          
         
        <Container>
            <Content>
                   <Webdealit onClick={homeNav}>
                    <img src="/images/login_logo.png"/>
                     <h5>WebflyStore</h5> 
                    </Webdealit>


                    <NavBar onClick={(e) => show()}>
                         <RiMenu3Line  id="menu" color="#f5f5f5"/>
                    </NavBar>
         

                <Search>
                    <div>
                        <input placeholder='Search for products' value={query}  onChange={(e) => setQuery(e.target.value)} />
                    </div>
                    <SearchIcon onClick={(e) => runquery()}>
                        <RiSearch2Line
                            size={15}
                            color='#000'/>
                    </SearchIcon>
                </Search>





                <Nav>
                    <Navlist>
                        
                        <Navchild   onClick={Music}>
                            <a>
                                <RiStore2Line
                                size={20}
                                color="#fff"/>
                                <span>Store</span>
                            </a>
                        </Navchild>



                        <Navchild onClick={userNav}>                               
                                <a>
                                {props.user  ?
                                    (
                                    <RiAccountCircleFill
                                    size={20}
                                    color="#0D96FF"/>
                                    ):(
                                    <RiAccountCircleLine
                                    size={20}
                                    color="#fff"/>
                                    )}
                                    <span  style={ props.user ? {color:"#0D96FF"} :  {color:"#fff"} }>User</span>
                                </a>
                        </Navchild>




                        <Navchild onClick={userNav}   onClick={buy}>
                            <a>
                            <RiShoppingCartLine
                              size={20}
                              color="#fff"
                              />
                           
                                <span>Cart   {props.cart ? "+ "+props.cart.size :""}</span>
                           
                            </a>
                        </Navchild>
                        



                        <Navchild  onClick={auth}>
                            <a>
                                <RiArrowRightCircleLine
                                size={20}
                                color="#fff"/>
                                {props.user ?
                                <span id='authstate'> {props.user ? authen: authen}</span>
                                :props.fbuser ?
                                <span id='authstate'>{props.fbuser ? authen: authen}</span>
                                :<span id='authstate'>Login</span>
                                 }

                            </a>
                        </Navchild>

                    </Navlist>
                </Nav>

            </Content>
        </Container>
        </>
    )

}


const Container = styled.div`  
background-image: linear-gradient(to top right,#1f505f, #07091C);
left: 0;
padding: 0  24px;
position:  fixed;
top: 0;
width: 100%;
z-index: 555;
height: 60px;



`;


const ShowDiv = styled.div`
position: absolute;
height: 100vh;
width: 100%;
z-index:600;
top:0;




#mainview{
height: 100vh;
width: 100%;
background-image: linear-gradient(to top right,#1f505f, #07091C); 
}


button{
display: flex;
justify-content:center;
border-radius:50%;
padding: 5px;
font-size:25pt;
color: #f5f5f5;
background: transparent;
border:none;
}

`;



const Content = styled.div`
display: flex;
align-items: center;
margin: 0 auto;
min-height: 100%;
max-height: 60%;
max-width: 1128px;
`;



const Webdealit = styled.div`
padding: 10px;
color: #fff;
font-size:20pt;
font-weight:700;
font-family: "Poppins", sans-serif;
margin: 5px;
margin-top:0px;
cursor: pointer;
display: flex;

img{
width: 30px;
height: 30px;
padding-top: 4px;
margin-right:10px;
object-fit:contain;
}

@media(max-width:768px){
font-size:15pt;
margin: 0px;
margin-top:0px;
margin-left:-20px;

img{
margin-top:0px;
}

}

`;


const Search = styled.div`
opacity:1;
flex-grow:1;
position: relative;
margin-top:5px;
& > div{
max-width:280px;

input{
border: none;
box-shadow:none;
background-color:#f5f5f5;
border-radius:7px;
color: rgba(0,0,0,0.9);
width: 218px;
padding: 0 8px 0 40px;
line-height:1.75;
font-weight:400;
font-size:14px;
height: 34px;
border-color:#dce6f1;
vertical-align:text-top;
text-align:left;
margin-left:40px;
}
}

@media(max-width:1200px){
input{
width: 178px;
}
}

@media(max-width:768px){
input{
display: none;
}
}


&:hover{
input{
background-color: #eef3f8;
}
}

`;



const Searchs = styled.div`
opacity:1;
flex-grow:1;
position: relative;
margin-top:30px;
& > div{
display: flex;
align-items:center;
justify-content:center;

input{
border: none;
box-shadow:none;
background-color:#f5f5f5;
border-radius:7px;
color: rgba(0,0,0,0.9);
width: 218px;
padding: 0 8px 0 40px;
line-height:1.75;
font-weight:400;
font-size:14px;
height: 34px;
border-color:#dce6f1;
vertical-align:text-top;
text-align:left;

}

@media(max-width:1200px){
input{
width: 80%;
}
}
`;




const NavBar = styled.div`
#menu{
display: none;
}
@media(max-width:768px){
position: absolute;
top:0;
right: 0;
margin:10px;
width: 100px;
height: auto;
display: flex;
justify-content:space-between;
font-size:25pt;

#menu{
display: block;
}
}

`;


const SearchIcon =  styled.div` 
width: 40px;
position: absolute;
z-index: 1;
top:8px;
left: 40px;
margin:0;
cursor:pointer;
display: flex;
justify-content: center;

@media(max-width:768px){
display: none;
}
`;

const SearchIcons = styled(SearchIcon)`
@media(max-width:768px){
display:block;
margin-left:15px;
}
`;



const Nav = styled.nav`
margin-left: auto;
display: block;



@media(max-width: 768px){
position: fixed;
left: 0;
bottom: 0;
width: 100%;
} 

`;


const Navlist = styled.ul`
display: flex;
flex-wrap:nowrap;
list-style-type:none;
@media(max-width: 1200px){
margin-right: 40px;
} 

@media(max-width:768px){
width: 100%;
height: 60px;
display: flex;
justify-content: center;
align-items: center;
position: fixed;
bottom: 0;
background-image: linear-gradient(to top right,#1f505f, #07091C);
}
`;


const Navchild = styled.li`
display: flex;
align-items: center;
cursor: pointer;
a{
align-items: center;
background:transparent;
display: flex;
flex-direction: column;
font-size: 12px;
font-weight: 400;
justify-content: center;
line-height: 1.5;
min-height:42px;
max-width: 250px;
margin-left: 45px;
margin-top:0px;
position: relative;
text-decoration: none;

span{
color: #fff;
display: flex;
align-items: center;
}
}


@media(max-width:1100px){
width: 25%;
text-align:left;
a{
width: 20%;
height:100%;
display: flex;
justify-content: center;
align-items: center;
margin-left:25px;
}
} 


&:hover, &:active{
a{
span{
color:rgba(0,0,0,0.9);
}
}
}
`;





const SideNav = styled.div`
@media(max-width:768px){
width:90%;
height: 100vh;
margin-top:10px;
padding:15px;
}

`;


const SubContainer = styled.div`
margin-top:15px;
color: #b8b9be; 
font-size:10pt;
`;


const TabInfo = styled.div`
display:flex;
justify-content:center;
align-items:center;
text-align:center;
font-weight:700;
color:#b8b9be;
margin-top:10px;
`;


const TabInfo1 = styled(TabInfo)`
margin-left:-10px;

`;


const Grooves = styled.div`
width: 70%;
padding-top:20px;
font-weight:800;
font-family: "Poppins", sans-serif;
color:#fff;
`;


const MenuBar = styled(Grooves)`
font-weight:none;
font-size:20pt;
color: #b8b9be;


`;


const HR = styled(Grooves)`
font-weight:none;
color: #b8b9be;
`;


const Tabs = styled.span`
font-weight:600;
cursor:pointer;
font-family: "Poppins", sans-serif;
margin-left:18px; 
`;






const mapStateToProps = (state) => {
    return{
        user: state.userState.user,
        fbuser:state.fbState.fbuser,
    };
};

const mapDispatchToProps = dispatch => ({
    signInAPIGoogle: (e) => dispatch(signInAPIGoogle()),
});


export default connect(mapStateToProps,mapDispatchToProps)(Header);






