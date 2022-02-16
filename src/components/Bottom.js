import React,{useEffect, useState} from 'react';
import styled  from "styled-components";
import { updatePostlikes, format, getListPostbottom } from "../actions";
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import {CloudinaryContext, Image, Transformation} from 'cloudinary-react'
import  {MobileView, BrowserView}  from 'react-device-detect';
import Footer from './Footer';
import { connect } from 'react-redux';
import { RiShoppingBag3Line } from 'react-icons/ri';



const Bottom = (props) => {

    const history = useNavigate();
    const [list, setlist] = useState([]);


    useEffect(() => {
    setlist(props.post2);
    console.log(props.post2);
    },[])





    const navigates = (x) =>{
        let frame = x.frame;
        let option = "P"
        updatePostlikes(frame);
        history('/model/'+frame+"/"+option)
        
      }
  
  
  
   
    return(<div>
            <Container>
              { list.map((v,i) =>
                 v !== undefined && v !== null ?
                    <CardShow onClick={(e)=>  navigates({frame: v.doc_id})}>
                        <img src={v.img_url}/>
                         <div id='writeUp'>
                            {v.name.length > 100 ? v.name.substring(0,100)+" ... Read more" : v.name }
                         </div>
                         <div id='writeUp'>
                            Price:$ {v.price}
                         </div>

                         <div id='end'>
                            <RiShoppingBag3Line  size={25}/>
                         </div>
                     </CardShow>
                  : ""
                 )}
            </Container>

            <Footer/>
        </div>
    )
}


const Container = styled.div`
position: relative;
height: 70vh;
width: 100%;
background: #f5f5f5;
display: flex;
justify-content:center;
align-items:center;
flex-wrap:wrap;
overflow-y:scroll;
padding-top:100px;

::-webkit-scrollbar {
display: none;
}

@media(max-width:768px){
margin-top:200px;
}
`;


const CardShow = styled.div`
height: 340px;
width: 350px;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
margin:20px;
border-radius:10px;

img{
border-radius:10px;
width: 100%;
height: 250px;
clip-path: ellipse(78% 100% at 32.64% 0%);
object-fit:cover;
}


#writeUp{
margin: 10px;
padding: 5px;
font-weight:600;
}


#end{
float: right;
margin-top:-50px;
margin-right:10px;
cursor: pointer;
}

@media(max-width:768px){
margin: 2px;
width: 90%;
height: 350px;

}
`;


const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        post2: state.postState2.post2
    }
}


const mapDispatcheToProps = (dispatch) => ({

})


export default connect(mapStateToProps,mapDispatcheToProps)(Bottom)