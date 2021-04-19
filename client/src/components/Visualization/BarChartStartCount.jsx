import React, { Component } from 'react';
import  { useEffect } from 'react';
import  { useState } from 'react';
import axios from 'axios';
import BarChart3 from '../D3Charts/BarChart3'

//'/getfindCountCategorySanalysisData' --> post request
const BarChartStartCount = (props)=>{

    const [data, setData] = useState({});

    useEffect(() => {
        axios.post(
            'http://localhost:3001/getfindCountStartanalysisData',
            {
                username: props.username,
            },
          ).then(response => {
              console.log("api call returned barchartstar: ", response.data);
              setData(response.data)
          })
          .catch(console.log);
    }, []);
    console.log("BarChartStarCount react function...",props.username)
    console.log("object.keys at the client side",Object.keys(data))

    return(<div>
         <BarChart3 data = {data}  chartId={"bar-starCount"}/>
    </div>)

}

export default BarChartStartCount;