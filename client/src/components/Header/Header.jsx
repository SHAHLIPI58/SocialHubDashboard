import React, { Component, useEffect, useState }  from 'react';
import classes from './Header.css';


const header = (props)=>{

    return <div class={classes.fixedheader}>
        
        <p style ={{float:'left'}}>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;Welcome {props.username}</p>
        <p style ={{float:'right'}}>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</p>
        <button type="submit" onClick={props.deleteToken} style={{float:'right', marginTop: '13px'}}> Logout &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</button> 
        <p style ={{float:'right'}}>&nbsp; &nbsp;&nbsp;</p>
        <input type ="text" placeholder="search" style={{float:'right', marginTop: '13px'}}/>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
}

export default header;