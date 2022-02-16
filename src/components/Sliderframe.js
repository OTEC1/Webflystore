import { React, useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import {RiArrowLeftCircleLine,RiArrowRightCircleLine} from 'react-icons/ri'
import {getListPostTop,updatePostlikes} from '../actions'; 
import { useNavigate } from "react-router-dom";


const   Sliderframe =  (props) => {

    const history = useNavigate();
    const [index, setindex] = useState(0);
    const [show, setshow] = useState('');
    const [list , setlist] = useState([]);

    useEffect(() => {
        setlist(props.post1);
    },[])



    const navigates = (x) =>{
        let frame = x.frame;
        let option = "P"
        updatePostlikes(frame);
        history('/model/'+frame+"/"+option)    
    }

    return (
        <Component>
            <button>
                {show}
            </button>
                    <Slider 
                        autoplay={1} 
                        duration={3500} 
                        previousButton={<RiArrowLeftCircleLine color="red"/>} 
                        nextButton={<RiArrowRightCircleLine color="red"/>}
                        onSlideChange={(e) => { setindex(e.slideIndex); setshow(e.slideIndex); }}>
                            
                                {list.map((v,i) => 
                                    v !== undefined ?
                                        <Container onClick={(e) =>  navigates({frame: v.doc_id})}>
                                            <img src={v.img_url}/>
                                            <h1>{v.name}</h1>
                                        </Container>
                                      : ""
                                    )
                            }
                    </Slider>
        </Component>
    )
}



const Component = styled.div`
position: relative;
height: 400px;
top: 0;
width: 100%;
background: #f5f5f5;
padding: 0;
margin-top: 60px;




button{
position: absolute;
margin-top:20%;
margin-left:45%;
width: 100px;
height: 40px;
background: #fff;
color: #000;
font-family: "Poppins", sans-serif;
z-index:99999;
border-radius:20px;
cursor: pointer;box-shadow: inset 0 0 0 1px rgba(0 0 0 /60%),inset 0 0 0 2px rgba(0 0 0 /0%) inset 0 0 0 1px rgba(0 0 0 /0);
box-shadow: inset 0 0 0 1px rgba(0 0 0 /60%),
&:hover{
background-color: rgba(207,207, 207, 0.25);
color: rgba(0, 0, 0, 0.75);
}
}


@media(max-width: 768px){
height: 200px;
button{
margin-top:45%;
margin-left:35%;
}
}
`;



const Container = styled.div`
width: 100%;
height: 100%;
cursor: pointer;
img{
object-fit:cover;
width: 100%;
height: 100%;
}
h1{
z-index:700;
}
`;


const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
}

const mapDispatcheToProps = (dispatch) => ({

})



export default connect(mapStateToProps,mapDispatcheToProps)(Sliderframe)