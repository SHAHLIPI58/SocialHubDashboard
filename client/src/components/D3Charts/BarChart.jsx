import React, {Component, useEffect} from 'react';
import * as d3 from "d3";

function BarChart (props) {

    useEffect(() => {
      drawChart();
    }, [])

    const drawChart = () => {
        const data = [12, 5, 6, 6, 9, 10];
        const h = 200
        const w =420

        // Remove the old svg
        d3.select(`#${props.chartId}`)
        .select('svg')
        .remove();

        const svg = d3.select(`#${props.chartId}`)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("margin-left", 200)
        .style("padding",0)
        .style("border", "1px solid black");
                      
        svg.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d, i) => i * 70)
          .attr("y", (d, i) => h - 10 * d)
          .attr("width", 65)
          .attr("height", (d, i) => d * 10)
          .attr("fill", "green")
          

        svg.selectAll("text")
          .data(data)
          .enter()
          .append("text")
          .text((d) => d)
          .attr("x", (d, i) => i * 70)
          .attr("y", (d, i) => h - (10 * d) - 3)

        

      }
      
      

     

        return <div id={props.chartId}></div>
}

export default BarChart;