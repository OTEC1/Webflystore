import React,{Component, useEffect} from 'react';
import { getUserAuth , getListPostTop, getListPostbottom,addtocart} from './actions';
import {BrowserRouter as  Router,Route, Routes}  from 'react-router-dom';
import Header from './components/Header'
import Middle from './components/Middle'
import Bottom from './components/Bottom'
import Footer from './components/Footer'
import './App.css';
import { connect } from 'react-redux';
import ItemSelected from './components/ItemSelected';
import BottomCon from './components/BottomCon';
import About from './components/About'

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
                <Route    path="/" element={<BottomCon/>}/>
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




              <Routes>
              <Route  path="/about/:index1/:index2/"  element={<Header/>}/>
              </Routes>

              <Routes>
              <Route  path="/about/:index1/:index2/"   element={<About/>}/>
              </Routes>

              <Routes>
                <Route path="/about/:index1/:index2/"  element={<Footer/>}/>
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
    dispatch(addtocart(localStorage.getItem("cart")))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
