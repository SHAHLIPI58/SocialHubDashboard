import React, { Component, useEffect, useState }  from 'react';
import axios from 'axios';
import classes from'./Visualization.css'
import Header from '../Header/Header'
import SideNav from '../SideNav/SideNav'
import MoonLoader from "react-spinners/MoonLoader";
import { BrowserRouter, Route, Switch, Redirect,Link } from 'react-router-dom';
import PieChart from '../D3Charts/PieChart';
import BarChartComponent from '../D3Charts/BarChartComponent'
import BarChart from '../D3Charts/BarChart'


const Visualization =(props)=>{
    
    // needed username as a prop for getting mongodb query for piechart, barchart component from node js query
    // this is dumb component.. just passing userid to <piechart> and <barchart> component as a props coming from dashboard component

    const data = [{ label: 'Apples', value: 10 }, { label: 'Oranges', value: 20 },{ label: 'Pineaaple', value: 20 }];
    return(<div>
        
         
            
            <BarChart chartId="barchartid1"/>
            {/* <hr /> */}
            <div className = {classes.svgContainer}>
                <PieChart data = {data} outerRadius={100} innerRadius = {0} chartId={"pie-container-2"}/>
            </div>
            {/* <div className = {classes.break} /> */}
           <BarChart chartId="barchartid2"/>
           <div className = {classes.svgContainer} >
                <PieChart data = {data} outerRadius={100} innerRadius = {0} chartId={"pie-container-3"}/>
            </div>
            <BarChart chartId="barchartid3"/>
            <br></br>
            <h1>BarChart Based On Category</h1>
            <BarChart chartId="barchartid4"/>
            
            
        
      
        
        
       
    </div>)
}

export default Visualization;