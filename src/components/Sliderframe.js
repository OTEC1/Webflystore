import { React, useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import {RiArrowLeftCircleLine,RiArrowRightCircleLine} from 'react-icons/ri'
import {getListPostTop,updatePostlikes} from '../actions'; 
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
import {CloudinaryContext, Image} from 'cloudinary-react'


const   Sliderframe =  (props) => {

    const history = useNavigate();
    const [index, setindex] = useState(0);
    const [show, setshow] = useState('');
    const [list , setlist] = useState([]);
    const [doc_id, setdoc_id] = useState('');


    useEffect(() => {
        setlist(props.post1);
    },[])



    const navigates = (x) =>{
        let frame = x.frame;
        let option = "P"
        updatePostlikes(frame);
        if(show)
           history('/model/'+frame+"/"+option)    
    }

    return (
        <Component>
            <button onClick={(e) =>  navigates({frame: doc_id})}>
                { show ? show : <Loader   width={25}  height={25} type="Oval"  color="#000"   /> }
            </button>
                    <Slider 
                        id="indexs"
                        autoplay={1} 
                        duration={3500} 
                        previousButton={<RiArrowLeftCircleLine color="red"/>} 
                        nextButton={<RiArrowRightCircleLine color="red"/>}
                        onSlideChange={(e) => { setindex(e.slideIndex); setshow(list[e.slideIndex].name); setdoc_id(list[e.slideIndex].doc_id) }}>
                            
                                {list.map((v,i) => 
                                    v !== undefined ?
                                         <div key={i} onClick={(e) =>  navigates({frame: v.doc_id})}>
                                            <CloudinaryContext cloudName="otecdealings"  onClick={(e) =>  navigates({frame: v.doc_id})}>
                                                <Image publicId={"Kokocarft/"+v.img_url+".jpg"}></Image>
                                            </CloudinaryContext>
                                        </div>
                                      : ""
                                    )
                            }
                            
                    </Slider>
        </Component>
    )
}



const Component = styled.div`
height: 80vh;
min-height:80vh;
top: 0;
width: 100%;
padding: 0;
margin-top: 50px;


div{
width: 100%;
height: 80vh;
min-height:80vh;
max-height:80vh;

img{
width: 100%;
height: 120vh;
object-fit:cover;
}

}

button{
position: absolute;
padding: 5px;
margin-top:20%;
margin-left:45%;
width: auto;
min-width:100px;
height: 40px;
background: #fff;
color: #000;
z-index:999;
border-radius:20px;
font-weight:800;

font-family: "Poppins", sans-serif;
cursor: pointer;box-shadow: inset 0 0 0 1px rgba(0 0 0 /60%),inset 0 0 0 2px rgba(0 0 0 /0%) inset 0 0 0 1px rgba(0 0 0 /0);
box-shadow: inset 0 0 0 1px rgba(0 0 0 /60%);

&:hover{
background-color: rgba(207,207, 207, 0.25);
color: rgba(0, 0, 0, 0.75);
}

}


@media(max-width: 768px){
height: 50vh;
max-height:50vh;
min-height:50vh;


button{
margin-top:45%;
margin-left:35%;
z-index:999;
}


div{
img{
width: 100%;
height: 100%;
object-fit:cover;
}
}


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