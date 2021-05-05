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
import BarChartStartCount from './BarChartStartCount'
import BarChartPriceCount from './BarChartPriceCount'
import PieChartFavCategoryCount from './PieChartFavCategoryCount'
import RatingHistory from './RatingHistory'



const Visualization =(props)=>{
    
    // needed username as a prop for getting mongodb query for piechart, barchart component from node js query
    // this is dumb component.. just passing userid to <piechart> and <barchart> component as a props coming from dashboard component

    // const data1 = [{ label: 'Apples', value: 10 }, { label: 'Oranges', value: 20 },{ label: 'Pineaaple', value: 20 }];
    // const data = [{"label":"3star","value":1},{"label":"4star","value":4},{"label":"5star","value":4},{"label":"3star","value":2},{"label":"4star","value":3}]
    console.log("Visulization.............username props", props.username)
    const [spanpreferences, setSpanPreferences] = useState({spanlevel : "365"});


    useEffect(()=> {
        setSpanPreferences({
            ...spanpreferences,
            spanlevel: spanpreferences.spanlevel,
            
        })
        // console.log("useEffect called in SideNav")
    },[spanpreferences.spanlevel])

    const onSubmit = (e) => {
        e.preventDefault();
        props.setShowVisualization(false);
        props.setShowVisualization(true);
        setSpanPreferences(spanpreferences);
      }

      const onSpanChange = (e) => {
        console.log("day span is changing...")
        setSpanPreferences({
            ...spanpreferences,
            spanlevel: e.target.value
        });
      }

   
    console.log("visulization...", spanpreferences.spanlevel)

    return(<div>
          <div className = {classes.svgContainer}>
          <form onSubmit={{}} style={{marginLeft:'20px'}}>
            Select Time Span :   
            <select name="pricelevel" id="pricelevel" onChange={onSpanChange} >
                    <option value="365" selected ={spanpreferences.spanlevel === "365"} >Any</option>
                    <option value="1" selected ={spanpreferences.spanlevel === "1"}> 1 Day</option>
                    <option value="7" selected ={spanpreferences.spanlevel === "7"} > 7 Days</option>

            </select>
            {/* <button type="submit"   style={{marginLeft:'0px'}} >Filter</button> */}
            </form>
    
         </div>

            <br/><br/>



            <div className = {classes.svgContainer}>
            <strong style={{color:'black',marginLeft:'140px'}}>CategoryWise User Ratings Count</strong> 
                <PieChartCategoryCount username={props.username} visulizationfilter = {spanpreferences.spanlevel}/>
            </div>
            
            <br></br>
            
            <div className = {classes.svgContainer}>
                <strong style={{color:'black',marginLeft:'160px'}}>StarWise User Ratings Count</strong>
                <br></br> 
                <BarChartStartCount username={props.username} visulizationfilter = {spanpreferences.spanlevel}/>
            </div>
            <br></br>
            <div className = {classes.svgContainer}>
            <br></br>
                <strong style={{color:'black',marginLeft:'130px'}}>PriceLevelWise User Ratings Count</strong> 
                <br></br>
                <BarChartPriceCount username={props.username} visulizationfilter = {spanpreferences.spanlevel}/>
            </div>
            <br></br>
            <br></br>
            <div className = {classes.svgContainer}>
            <br></br>
            <strong style={{color:'black',marginLeft:'70px'}}>TopMost 3 Categories User Ratings &gt; 3 Stars</strong>
                <PieChartFavCategoryCount username={props.username} visulizationfilter = {spanpreferences.spanlevel}/>
            </div>


            <div className={classes.fixedheader2}>
                       <div className="scrollHere2">
                       <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                            <strong style={{color:'white'}}>Rating History</strong> 
                        </div>
            </div>


            <div className = {classes.svgContainer}>
            <br></br>
            <br/>
            
                <RatingHistory username={props.username}/>
           
                
            </div>

            

          
            
            {/* <hr /> */}
            {/* <div className = {classes.svgContainer}>
                <PieChart data = {data} outerRadius={200} innerRadius = {0} chartId={"pie-container-2"}/>
            </div> */}

            {/* <div className = {classes.break} /> */}
            {/* <div className = {classes.svgContainer}>
                <BarChart chartId="barchartid2"/>
            </div> */}
           
           {/* <div className = {classes.svgContainer} >
                <PieChart data = {data} outerRadius={100} innerRadius = {0} chartId={"pie-container-3"}/>
            </div>
            <BarChart chartId="barchartid3"/>
            <br></br>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BarChart Based On Category</h1>
            <BarChart chartId="barchartid4"/>
            <BarChart chartId="barchartid1"/> */}
            

       
    </div>)
}

export default Visualization;