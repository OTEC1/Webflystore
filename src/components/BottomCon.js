import { React, useState } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import {getListPostbottom} from '../actions'; 
import Bottom from "./Bottom";
import Sliderframe from "./Sliderframe";


const   BottomCon =  (props) => {

    useState(() => {
        props.LoadPost();
    },[])

  
    return (
        <Component>
               {props.post2 !== null ? <Bottom post2={props.post2} /> : "loading..."}
        </Component>
    )
}



const Component = styled.div``;


const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        post2: state.postState2.post2
    }
}


const mapDispatcheToProps = (dispatch) => ({
    LoadPost: (e) =>  dispatch(getListPostbottom()),
})

export default connect(mapStateToProps,mapDispatcheToProps)(BottomCon);