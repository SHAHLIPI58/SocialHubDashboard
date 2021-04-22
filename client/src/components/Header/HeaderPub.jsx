import React, { Component, useEffect, useState }  from 'react';
import classes from './HeaderPub.css';


const header = (props)=>{

    return <div class={classes.fixedheader}>
         <p style ={{float:'left'}}>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<strong style={{color:'white'}}>SocialHub </strong></p>
       
        </div>
}

export default header;