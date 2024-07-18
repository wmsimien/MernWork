import React, { useRef, useEffect, useState } from 'react';
import { select, axisBottom, axisRight, scaleLinear, scaleBand, max } from 'd3';

import './genderBarChart.css';

function GenderBarChart({ chartWidth, chartHeight, chartData }) {
  const [data, setData] = useState(chartData);

  const svgRef = useRef();

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((value) => value.gender))
      .range([0, 300])
      .padding(0.5);

    // const yScale = scaleLinear().domain([0, 150]).range([150, 0]);
    const yScale = scaleLinear()
      .domain([0, max(data, (d) => d.value)])
      .range([150, 0]);

    const xAxis = axisBottom(xScale).ticks(data.length);

    svg.select('.x-axis').style('transform', 'translateY(150px)').call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select('.y-axis').style('transform', 'translateX(300px)').call(yAxis);

    svg
      .selectAll('.bar')
      .data(data) // data join
      .join('rect')
      .attr('class', 'bar')

      .style('transform', 'scale(1, -1)')
      .attr('x', (value) => xScale(value.gender))
      .attr('y', -150)
      .attr('width', xScale.bandwidth())
      .transition()
      .attr('fill', (value) => (value.gender === 'Male' ? 'blue' : 'purple'))
      .attr('height', (value) => 150 - yScale(value.value));
  }, [data]);

  return (
    <React.Fragment>
      <h1 className="charts-header">Registered Clients By Gender</h1>
      <svg
        className="charts-svg"
        viewBox={`0 -10 ${chartHeight} ${chartWidth}`}
        ref={svgRef}
      >
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </React.Fragment>
  );
}

export default GenderBarChart;
