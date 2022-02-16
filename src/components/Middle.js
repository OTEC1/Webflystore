import { React, useState } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import {getListPostTop} from '../actions'; 
import Sliderframe from "./Sliderframe";


const   Middle =  (props) => {

    useState(() => {
        props.LoadPost();
    },[])

  
    return (
        <Component>
               {props.post1 !== null ? <Sliderframe post1={props.post1} /> : "loading..."}
        </Component>
    )
}



const Component = styled.div``;


const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        post1: state.postState1.post1
    }
}


const mapDispatcheToProps = (dispatch) => ({
    LoadPost: (e) =>  dispatch(getListPostTop()),
})

export default connect(mapStateToProps,mapDispatcheToProps)(Middle);