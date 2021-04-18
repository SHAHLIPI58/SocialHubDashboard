import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function BarChart1({ width, height, data }){
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        
        const svg = d3.select(ref.current);

        // svg.selectAll("text")
        //   .data(data)
        //   .enter()
        //   .append("text")
        //   .text((d) => d)
        //   .attr("x", (d, i) => i * 80)
        //   .attr("y", (d, i) => height )
          

        var selection = svg.selectAll("rect").data(data);
        var yScale = d3.scaleLinear()
                            .domain([0, d3.max(data)])
                            .range([0, height-100]);
        
        selection
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d))

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 80)
            .attr("y", (d) => height)
            .attr("width", 60)
            .attr("height", 0)
            .attr("fill", "green")
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d))
       
        
        selection
            .exit()
            .transition().duration(300)
                .attr("y", (d) => height)
                .attr("height", 0)
            .remove()
    }


    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default BarChart1;