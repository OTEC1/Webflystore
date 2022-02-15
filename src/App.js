import React,{Component, useEffect} from 'react';
import { getUserAuth , getListPostTop, getListPostbottom} from './actions';
import {BrowserRouter as  Router,Route, Routes}  from 'react-router-dom';
import Header from './components/Header'
import Middle from './components/Middle'
import Bottom from './components/Bottom'
import Footer from './components/Footer'
import './App.css';
import { connect } from 'react-redux';

function App(props) {

  useEffect(() => {
    props.LoadPost();
  },[])
  return (
    <div className="App">
            <Router>
              <Routes>
              <Route  path="/"  element={<Header/>}/>
              </Routes>

              <Routes>
              <Route  path="/"  element={<Middle/>}/>
              </Routes>

              <Routes>
                <Route    path="/" element={<Bottom/>}/>
              </Routes>

              <Routes>
                <Route    path="/" element={<Footer/>}/>
              </Routes>
          </Router>

    </div>
  );
}



const mapStateToProps = (state) => {

}


const  mapDispatchToProps = (dispatch) => ({
  LoadPost: (e) => {
    dispatch(getListPostTop());
    dispatch(getListPostbottom());
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
