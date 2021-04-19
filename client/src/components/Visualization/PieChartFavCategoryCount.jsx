import React, { Component } from 'react';
import  { useEffect } from 'react';
import  { useState } from 'react';
import axios from 'axios';
import PieChart1 from '../D3Charts/PieChart1'

//'/getfindCountCategorySanalysisData' --> post request
const PieChartFavCategoryCount = (props)=>{

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post(
            'http://localhost:3001/getfindCountFavCatanalysisData',
            {
                username: props.username,
            },
          ).then(response => {
              console.log("api call returned piechartFavouritecategorry: ", response.data);
              setData(response.data)
          })
          .catch(console.log);
    }, []);
    console.log("PieChartFavouriteCategoryCount react function...",props.username)
    console.log(data)

    return(<div>
         <PieChart1 data = {data} outerRadius={200} innerRadius = {80} chartId={"pie-favcategoryCount"}/>
    </div>)

}

export default PieChartFavCategoryCount;