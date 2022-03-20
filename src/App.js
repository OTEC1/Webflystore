import React,{Component, useEffect} from 'react';
import { getUserAuth , getListPostTop, getListPostbottom,addtocart} from './actions';
import {BrowserRouter as  Router,Route, Routes}  from 'react-router-dom';
import Header from './components/Header'
import Middle from './components/Middle'
import Bottom from './components/Bottom'
import Footer from './components/Footer'
import { connect } from 'react-redux';
import ItemSelected from './components/ItemSelected';
import BottomCon from './components/BottomCon';
import About from './components/About'
import Space from './components/Space';
import { getDoc,doc} from 'firebase/firestore/lite';
import './App.css';
import db from './firebase';
import Shipping from './components/Shipping';
import ShippingCost from './components/ShippingCost';
import Cancel from './components/Cancel';
import Capture from './components/Capture';
 
function App(props) {

  let list = [];
  useEffect( async () => {
    props.getUserAuth();
    const docRef = doc(db, process.env.REACT_APP_ADMIN, process.env.REACT_APP_DOC);
    const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        list.push(docSnap.data());
          list.map((v,i) => sessionStorage.setItem("token",v.token))
         
      }else 
          console.log("Not found !");
    
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




              <Routes>
                <Route  path="/store"  element={<Header/>}/>
                </Routes>
                <Routes>
                <Route  path="/store"  element={<Space/>}/>
                </Routes>
                <Routes>
                <Route  path="/store"  element={<Bottom/>}/>
              </Routes>
              



              <Routes>
                <Route  path="/shipping"  element={<Header/>}/>
                </Routes>
                <Routes>
                <Route  path="/shipping"  element={<Shipping/>}/>
                </Routes>
                <Routes>
                <Route  path="/shipping"  element={<Footer/>}/>
              </Routes>



              <Routes>
                <Route  path="/shippingcost"  element={<Header/>}/>
                </Routes>
                <Routes>
                <Route  path="/shippingcost"  element={<ShippingCost/>}/>
                </Routes>
                <Routes>
                <Route  path="/shippingcost"  element={<Footer/>}/>
              </Routes>


              <Routes>
                <Route  path="/cancel"  element={<Header/>}/>
                </Routes>
                <Routes>
                <Route  path="/cancel"  element={<Cancel/>}/>
                </Routes>
                <Routes>
                <Route  path="/cancel"  element={<Footer/>}/>
              </Routes>



              <Routes>
                <Route  path="/capture"  element={<Header/>}/>
                </Routes>
                <Routes>
                <Route  path="/capture"  element={<Capture/>}/>
                </Routes>
                <Routes>
                <Route  path="/capture"  element={<Footer/>}/>
              </Routes>
              
          </Router>

    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  }
}


const  mapDispatchToProps = (dispatch) => ({
  getUserAuth: (e) => {
    dispatch(getUserAuth());
    dispatch(addtocart(localStorage.getItem("cart")))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
