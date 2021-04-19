import React, { Component } from 'react';
import  { useEffect } from 'react';
import  { useState } from 'react';
import axios from 'axios';
import BarChart2 from '../D3Charts/BarChart2'

//'/getfindCountCategorySanalysisData' --> post request
const BarChartStartCount = (props)=>{

    const [data, setData] = useState({});

    useEffect(() => {
        axios.post(
            'http://localhost:3001/getfindCountPriceanalysisData',
            {
                username: props.username,
            },
          ).then(response => {
              console.log("api call returned barchartPrice: ", response.data);
              setData(response.data)
          })
          .catch(console.log);
    }, []);
    console.log("BarChartPriceCount react function...",props.username)
    console.log("object.keys at the client side",Object.keys(data))

    return(<div>
         <BarChart2 data = {data}  chartId={"bar-priceCount"}/>
          </div>)

}

export default BarChartStartCount;