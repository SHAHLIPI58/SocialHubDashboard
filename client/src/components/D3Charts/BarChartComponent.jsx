import React, { Component } from 'react';
import  { useEffect } from 'react';
import  { useState } from 'react';
import BarChart1 from './BarChart1'
const datas = [10, 30, 40, 20]

const BarChartComponent = (props)=>{

    const [data, setData] = useState([]);

    useEffect(() => {
        changeData();
    }, []);

    const changeData = () => {
        setData(datas);
       
    }
    return(<div>
         <h2>Graphs with React</h2>
           
           <BarChart1 width={600} height={400} data={data} />
    </div>)

}

export default BarChartComponent;