import styled from "styled-components";
import { RiShoppingBag3Line } from 'react-icons/ri';
import { navigates } from "./Bottom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePostlikes, format,Currency} from "../actions";
import {CloudinaryContext, Image} from 'cloudinary-react'



//Component Called from two Views *Bottom and Item*
const Card = (props) => {


    const history = useNavigate();
    


    const navigates = (x) =>{
        let frame = x.frame;
        let option = "P"
        updatePostlikes(frame);
        history('/model/'+frame+"/"+option)
      }
 
    return(
        <CardShow onClick={(e)=>  navigates({frame: props.doc_id})}  height={props.height}  width={props.width}>
        {props.img ? 
          
          <CloudinaryContext cloudName="otecdealings">
             <Image id="items" publicId={"Kokocarft/"+props.img_url+".jpg"}></Image>
          </CloudinaryContext>
         
         : <CloudinaryContext cloudName="otecdealings">
               <Image id="home" publicId={"Kokocarft/"+props.img_url+".jpg"}></Image>
         </CloudinaryContext>}

        {!props.img  ?
         <>
            <div id='writeUp'>
                {props.name.length > 100 ? props.name.substring(0,100)+" ... Read more" : props.name }
            </div>

            <div id='writeUp'>
                Price: {Currency() + props.price}
            </div>

            <div id='end'>
                <RiShoppingBag3Line  size={25}/>
            </div>
          </>
        : ""}

      </CardShow>
    )
    
}





const CardShow = styled.div`
height: ${(props) => `${props.height}px`};
min-height: ${(props) => `${props.height}px`};
max-height: ${(props) => `${props.height}px`};
width: ${(props) => `${props.width}px`};
min-width:${(props) => `${props.width}px`};
max-width:${(props) => `${props.width}px`};
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
margin:20px;
border-radius:10px;
background:#fff;
#home{
border-radius:10px;
width: 100%;
height: 250px;
clip-path: ellipse(78% 100% at 32.64% 0%);
object-fit:cover;
}

#items{
border-radius:10px;
height: ${(props) => `${props.height}px`};
min-height: ${(props) => `${props.height}px`};
max-height: ${(props) => `${props.height}px`};
width: ${(props) => `${props.width}px`};
min-width:${(props) => `${props.width}px`};
max-width:${(props) => `${props.width}px`};
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
margin: 5px;
width: 90%;
height: 350px;

}
`;



export default Card;