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
import BarChart2 from '../D3Charts/BarChart2'
import BarChart3 from '../D3Charts/BarChart3'
import PieChartCategoryCount from './PieChartCategoryCount'


const Visualization =(props)=>{
    
    // needed username as a prop for getting mongodb query for piechart, barchart component from node js query
    // this is dumb component.. just passing userid to <piechart> and <barchart> component as a props coming from dashboard component

    const data1 = [{ label: 'Apples', value: 10 }, { label: 'Oranges', value: 20 },{ label: 'Pineaaple', value: 20 }];
    const data = [{"label":"3star","value":1},{"label":"4star","value":4},{"label":"5star","value":4},{"label":"3star","value":2},{"label":"4star","value":3}]
    console.log("Visulization.............username props", props.username)
    return(<div>

            <div className = {classes.svgContainer}>
                <PieChartCategoryCount username={props.username} />
            </div>
            
            <div className = {classes.svgContainer}>
                <BarChart3 chartId="barchartid6"/>
            </div>

            <div className = {classes.svgContainer}>
                <BarChart2 chartId="barchartid5"/>
            </div>

          
            
            {/* <hr /> */}
            <div className = {classes.svgContainer}>
                <PieChart data = {data} outerRadius={200} innerRadius = {0} chartId={"pie-container-2"}/>
            </div>

            {/* <div className = {classes.break} /> */}
            <div className = {classes.svgContainer}>
                <BarChart chartId="barchartid2"/>
            </div>
           
           <div className = {classes.svgContainer} >
                <PieChart data = {data} outerRadius={100} innerRadius = {0} chartId={"pie-container-3"}/>
            </div>
            <BarChart chartId="barchartid3"/>
            <br></br>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BarChart Based On Category</h1>
            <BarChart chartId="barchartid4"/>
            <BarChart chartId="barchartid1"/>
            
            
        
      
        
        
       
    </div>)
}

export default Visualization;