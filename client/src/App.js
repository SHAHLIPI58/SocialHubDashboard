import React, { Component } from 'react';
import classes from './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import  { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Profile from './components/Profile/Profile'


const data = [{ label: 'Apples', value: 10 }, { label: 'Oranges', value: 20 },{ label: 'Pineaaple', value: 20 }];
const App = (props)=> {


  function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    // return userToken?.token;
    if(userToken == undefined) {
      return undefined;
    }
    return userToken.token;
  }

  const [token, setToken] = useState(getToken);

  function saveToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  }

  function deleteToken(){
    sessionStorage.clear()
    setToken(undefined);
  }

 
  return (
      <div className={classes.wrapper}>
       
         <BrowserRouter>
            <switch>
              <Route exact path="/">
                {token ? <Redirect to="/dashboard" /> : <Login saveToken={saveToken} />}
              </Route>
              <Route exact path = "/login">
                  {token ? <Redirect to="/dashboard" />  : <Login saveToken={saveToken} />}
              </Route>
              <Route exact path = "/dashboard">
                  {token ? <Dashboard deleteToken={deleteToken}/> : <Redirect to="/login" /> }
              </Route>
              <Route exact path = "/signup">
                {token ? <Redirect to="/dashboard" />  :  <Signup/>}
              </Route>
              <Route exact path = "/Profile">
                {token ? <Profile deleteToken={deleteToken} />: <Redirect to="/dashboard" />}
              </Route>
            </switch>
         </BrowserRouter>
      </div>
    );
  
}

export default App;
