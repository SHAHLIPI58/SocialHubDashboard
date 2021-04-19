import React, { Component } from 'react';
import  { useEffect } from 'react';
import  { useState } from 'react';
import axios from 'axios';
import PieChart from '../D3Charts/PieChart'

//'/getfindCountCategorySanalysisData' --> post request
const PieChartCategoryCount = (props)=>{

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post(
            'http://localhost:3001/getfindCountCategorySanalysisData',
            {
                username: props.username,
            },
          ).then(response => {
              console.log("api call returned piechartcategorry: ", response.data);
              setData(response.data)
          })
          .catch(console.log);
    }, []);
    console.log("PieChartCategoryCount react function...",props.username)
    console.log(data)

    return(<div>
         <PieChart data = {data} outerRadius={200} innerRadius = {80} chartId={"pie-categoryCount"}/>
    </div>)

}

export default PieChartCategoryCount;