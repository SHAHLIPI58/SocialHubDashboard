import React, { Component, useEffect, useState }  from 'react';
import logo from './noresult.gif'
import classes from './NoResultFound.css'

const NoResultFound = ()=>{
    return(
    <div>
        <img src={logo} className = {classes.imgnotfound} />
        <h3>Sorry, we found no results :(</h3>
    </div>)
}

export default NoResultFound;