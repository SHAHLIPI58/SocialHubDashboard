import { useEffect, useState } from 'react';
import React, { Component }  from 'react';
import axios from 'axios';
import classes from './Box.css'

const box =(props)=>{

    const [stateVariable, setStateVariable] = useState('');

    useEffect(() => {
        // send HTTP request
        // save response to variable
        axios.get(`http://localhost:3001/buy?val=${props.value}`)
      .then(res => {
        console.log(res.data);
        setStateVariable(res.data);
      })

    }, [])

    return(
        <div className ={classes.box}>
             {stateVariable}
        </div>
    )
}

export default box;