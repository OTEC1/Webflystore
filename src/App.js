import React,{Component, useEffect} from 'react';
import { getUserAuth , getListPostTop, getListPostbottom} from './actions';
import {BrowserRouter as  Router,Route, Routes}  from 'react-router-dom';
import Header from './components/Header'
import Middle from './components/Middle'
import Bottom from './components/Bottom'
import Footer from './components/Footer'
import './App.css';
import { connect } from 'react-redux';
import ItemSelected from './components/ItemSelected';
import BottomContainer from './components/BottomContainer';

function App(props) {

  useEffect(() => {
    props.getUserAuth();
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
                <Route    path="/" element={<BottomContainer/>}/>
              </Routes>

              <Routes>
                <Route    path="/" element={<Footer/>}/>
              </Routes>



              <Routes>
              <Route  path="/model/:frame/:option/"  element={<Header/>}/>
              </Routes>

  
              <Routes>
                <Route    path="/model/:frame/:option/" element={<ItemSelected/>}/>
              </Routes>

              <Routes>
                <Route    path="/model/:frame/:option/" element={<Footer/>}/>
              </Routes>

          </Router>

    </div>
  );
}



const mapStateToProps = (state) => {

}


const  mapDispatchToProps = (dispatch) => ({
  getUserAuth: (e) => {
    dispatch(getUserAuth());
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
