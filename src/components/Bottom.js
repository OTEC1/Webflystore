import React,{useEffect, useState} from 'react';
import styled  from "styled-components";
import {getListPostbottom } from "../actions";
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import {CloudinaryContext, Image, Transformation} from 'cloudinary-react'
import  {MobileView, BrowserView}  from 'react-device-detect';
import Footer from './Footer';
import { connect } from 'react-redux';
import { RiShoppingBag3Line } from 'react-icons/ri';
import Card from './Card';
import Space from './Space';







const Bottom = (props) => {
    
    const [list, setlist] = useState([]);
   
    useEffect(() => {
    setlist(props.post2);
    },[props.post2])
  

   
    return(<div>
            <Container>
              { list ? (
                list.map((v,i) =>
                    v !== undefined && v !== null ?
                        <Card  key={i} doc_id={v.doc_id}  name={v.name} price={v.price} img_url={v.img_url}  height={350}  width={300}/>
                    : ""
                    )
              ):""}
            </Container>
            <Footer/>
        </div>
    )
}


const Container = styled.div`
position: relative;
height: 70vh;
width: 100%;
display: flex;
justify-content:center;
align-items:center;
flex-wrap:wrap;
overflow-y:scroll;
padding-top:50px;
padding-bottom:100px;



::-webkit-scrollbar {
display: none;
}

@media(max-width:768px){
margin-top:0px;
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