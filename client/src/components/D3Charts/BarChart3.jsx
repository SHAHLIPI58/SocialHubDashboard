
import React, {Component, useEffect,useState} from 'react';
import * as d3 from "d3";

function BarChart3 (props) {
   
  
      
    useEffect(() => {
        if(Object.keys(props.data).length > 0){
            drawChart();
        }
       

   },[props.data])

   

    const drawChart = () => {


        // Remove the old svg
        d3.select(`#${props.chartId}`)
        .select('svg')
        .remove();

        
        let data = props.data

    
        let margin = {top: 20, right: 20, bottom: 30, left: 40};
        let svgWidth = 590, svgHeight = 300;
        let height = svgHeight- margin.top- margin.bottom, width = svgWidth - margin.left - margin.right;
        let sourceNames = [], sourceCount = [];
        
        let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);
        for(let key in data){
            if(data.hasOwnProperty(key)){
                sourceNames.push(key);
                sourceCount.push(parseInt(data[key]));
            }
        }
        x.domain(sourceNames);
        y.domain([0, d3.max(sourceCount, function(d) { return d; })]);
        
        let svg = d3.select(`#${props.chartId}`).append("svg");
        svg.attr('height', svgHeight)
            .attr('width', svgWidth);
        
        svg = svg.append("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        
        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(5))
            ;
                

        //color 
        var colors = d3.scaleQuantize()
            .domain([0,50])
            .range(["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598", 
            "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"]);
        // Create rectangles
        let bars = svg.selectAll('.bar')
            .data(sourceNames)
            .enter()
            .append("g")
        

            
        
        bars.append('rect')
            .attr('class', 'bar')
            .attr("x", function(d) { return x(d); })
            .attr("y", function(d) { return y(data[d]); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(data[d]); })
	        .attr("fill", function(d) {
                if (data[d] < 5) {
                  return " #6e40aa";
                 
                }
                return "#1ac7c2";
              });
            
        bars.append("text")
            .text(function(d) { 
                return data[d];
            })
            .attr("x", function(d){
                return x(d) + x.bandwidth()/2;
            })
            .attr("y", function(d){
                return y(data[d]) - 5;
            })
            .attr("font-family" , "sans-serif")
            .attr("font-size" , "14px")
            .attr("fill" , "black")
            .attr("text-anchor", "middle");


      }
      
    
        return <div id={props.chartId}></div>
}

export default BarChart3;