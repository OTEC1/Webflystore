import React, { useEffect,useState} from "react"
import styled from "styled-components"
import {RouterReview} from   '../actions'
import { connect } from "react-redux";
import {FacebookShareButton,TwitterShareButton,WhatsappShareButton,FacebookIcon,WhatsappIcon,TwitterIcon} from 'react-share'


const ShareDialog =  (props) => {


    
    const [editorText1, seteditorText1] = useState();



    const reset =  (e) => {
        props.sendRequestToModel(e,2);
        seteditorText1('');
    };


    const PostData = (e) => {
        RouterReview(props.id,editorText1,props.user ? props.user.email : "Anonymous");
        props.sendRequestToModel(e,2);
        seteditorText1('');
    }


    return(
        <>
        {props.showModelReview === "open" 
         &&(
            <Container>
                
                <Content>
                    <Header>
                    <h2>We love hearing  from you 💃💕</h2>
                    <button  onClick={(event) => reset(event)}>X</button>
                    </Header>
                        <SharedContent>
                                <Editor>
                                {props.user ? <img  src={props.user.photoURL}/> :    <img  src="/images/shop.png"/>  }
                                <textarea placeholder="Pls drop your review here" onChange={(e) => seteditorText1(e.target.value)} value={editorText1}/>

                                </Editor>  
                            </SharedContent>

                            <ShareCreation>
                                <Attach/>
                                <PostButton  disabled={!editorText1  ? true : false}  onClick={(e) => PostData(e)}>
                                  Post
                               </PostButton>
                        </ShareCreation>
                </Content>
               </Container>
        )}
        </>
    )

}

const Container = styled.div `
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    z-index: 99999;
    color:black;
    width:100%;
    background-color: rgba(0,0,0,0.8);
`;



const Content  =  styled.div`
    max-width:30%;
    background-color: white;
    max-height:auto;
    overflow:initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top:25vh;
    margin: 0 auto;

    @media(max-width: 768px){
        top:25vh;
        max-width:100%;
    }
   
`;




const Header  =  styled.div`
     display:  block;
     padding : 16px 20px;
     border-bottom: 1px solid rgba(0,0,0,0.15);
     font-size:16px;
     line-height: 1.5;
     color: rgba(0,0,0,0.6);
     font-weight: 400;
     display:flex;
     justify-content: space-between;
     align-items:center;
     button{
         height:40px;
         width:40px;
         min-width:auto;
         border-radius: 50%;
     }
`;



const SharedContent = styled.div`
    display:flex;
    flex-direction: column;
    flex-grow:1;
    overflow-y:auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;



const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg,img{
        width:48px;
        height:48px;
        background-clip: content-box;
        border:2px solid  transparent;
        border-radius:50%;
        padding:5px;
    }
    span{
        font-weight:600;
        font-size:16px;
        line-height:1.5px;
    }
`;



const ShareCreation = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;


const Attach = styled.div`
    display:flex;
    align-items:center;
    height:40px;
    min-width: auto;
    color: rgba(0,0,0,0.5);
`;



const Editor = styled.div`

padding:10px;
text-align: center;

img{
width: 40px;
height: 40px;
margin:10px;
border-radius: 50%;
}

textarea{
width: 95%;
height: 200px;
font-weight:600;
resize: none;
padding:5px;

}

@media(max-width:768px){
padding:10px 20px;
img{
margin:7px;
}
} 
`;





const PostButton = styled.button`
min-width:60px;
border-radius: 20px;
padding-left: 16px;
padding-right: 16px;
height: 35px;
right:2px;
background: ${(props) => (props.disabled ?  "rgba(0,0,0,0.8)" : "#0a66c2")};
color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)": "white")};
&:hover{
background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004162")};
}
`;


const  mapStateToProps = (state)  => {
    return {
        user: state.userState.user,
    };
};

const mapDistpachToProps = (dispatch) => ({
   
});

export default  connect(mapStateToProps,mapDistpachToProps)(ShareDialog);