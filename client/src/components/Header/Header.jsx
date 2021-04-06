import React, { Component, useEffect, useState }  from 'react';
import classes from './Header.css';


const header = (props)=>{

    return <div class={classes.fixedheader}>
        <p style ={{float:'left'}}>Welcome {props.username}</p>
       
        <button type="submit" onClick={props.deleteToken} style={{float:'right'}}> Logout </button> 
        <input type ="text" placeholder="search" style={{float:'right'}}/>
        </div>
}

export default header;