import React, { Component, useEffect, useState }  from 'react';
import classes from './Header.css';


const header = (props)=>{

    return <div class={classes.fixedheader}>
        <p style ={{float:'left'}}>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<strong style={{color:'white'}}>Welcome {props.username}</strong></p>
        <p style ={{float:'right'}}>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</p>
        <button type="submit" onClick={props.deleteToken} className= {classes.btnLogout} style={{float:'right', marginTop: '13px', textAlign:'center'}}> Logout &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</button> 
        <p style ={{float:'right'}}>&nbsp; &nbsp;&nbsp;</p>
        <button type="button" 
                onClick={(e) => {
                e.preventDefault();
                window.location.href='/Profile';
                }} className= {classes.btnLogout} style={{float:'right', marginTop: '13px', textAlign:'center', background:'#3498db', border: '#2980b9 1px solid'}}> Profile &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</button>
        
        </div>
}

export default header;