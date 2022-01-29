import React from "react";
import UserRegisterPage from '../pages/UserRegister'
import LoginPage from '../pages/Login';
import HomePage from "../pages/HomePage";
import LanguageSelector from '../components/LanguageSelector';
import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import UserPage from "../pages/UserPage";
import TopBar from "../pages/TopBar";
import { useSelector } from "react-redux";




const App  =props=> {

  const {isLoggedIn} =useSelector(store=>({isLoggedIn:store.isLoggedIn}));
  
  return (
    <div> 
      
        <Router>   
        <TopBar />         
        <Switch>
            <Route exact path="/"  component={HomePage} ></Route>              
            {!isLoggedIn &&( 
            <><Route path="/login" component={LoginPage }></Route>
            <Route path="/register" component={UserRegisterPage} />                                        
            </>
            )}
            <Route path="/user/:username" component={UserPage}></Route>
            <Redirect to="/"/>
        </Switch>
        </Router>          
        <LanguageSelector/>
    </div>
  );
}


export default App;
