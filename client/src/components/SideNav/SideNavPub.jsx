import React, { useEffect, useState }  from 'react';
import classes from './SideNavPub.css'
const SideNavPub = (props) => {
return (
    <div>
        <div className={classes.sidenav}>
            
        <img src={require("./LoginImg.jpg")} alt="Italian Trulli" style={{height:"100%"}}/>
        </div>
    
    </div>
 );
};
export default SideNavPub;