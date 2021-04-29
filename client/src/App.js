import React, { Component } from 'react';
import  { useEffect } from 'react';
import classes from './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import  { useState } from 'react';
import Box from "./components/Box/Box"
import Dashboard from './components/Dashboard/Dashboard'
import Preferences from './components/Preferences/Preferences'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import BarChartComponent from './components/D3Charts/BarChartComponent'
import BarChart from'./components/D3Charts/BarChart'
import PieChart from './components/D3Charts/PieChart'
import Profile from './components/Profile/Profile'




// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   // return userToken?.token;
//   if(userToken == undefined) {
//     return undefined;
//   }
//   return userToken.token;
// }





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

  //const token = getToken();
  //console.log("token ="+JSON.stringify(token));

  // if(!token) {
  //   return <Login saveToken={saveToken} />
  // }
  


    return (
      <div className={classes.wrapper}>
        {/* <h1>react app demo boxes</h1> */}
         {/* <Box value="10">box1</Box>
         <Box value="20">box1</Box>
         <Box value="30">box1</Box> */}
       
       
         <BrowserRouter>
            <switch>
              <Route exact path="/">
                {token ? <Redirect to="/dashboard" /> : <Login saveToken={saveToken} />}
                {/* <Redirect to="/dashboard" /> */}
              </Route>
              <Route exact path = "/login">
                  {token ? <Redirect to="/dashboard" />  : <Login saveToken={saveToken} />}
                  {/* <Dashboard deleteToken={deleteToken}/> */}
              </Route>
              <Route exact path = "/dashboard">
                  {token ? <Dashboard deleteToken={deleteToken}/> : <Redirect to="/login" /> }
                  {/* <Dashboard deleteToken={deleteToken}/> */}
              </Route>
              <Route exact path = "/signup">
                {token ? <Redirect to="/dashboard" />  :  <Signup/>}
              </Route>
              <Route exact path = "/Profile">
                {token ? <Profile deleteToken={deleteToken} />: <Redirect to="/dashboard" />}
              </Route>
            </switch>
         </BrowserRouter>

         {/* <div style ={{marginTop: '0px'}}>
          <BarChart id="barchartid"/>
          </div>
         
         <BarChartComponent/> */}
         {/* <PieChart data = {data}
                  outerRadius={100}
                  innerRadius = {0}/> */}
          
         
      </div>
    );
  
}

export default App;
