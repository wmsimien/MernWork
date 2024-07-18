import React, { useRef, useEffect, useState } from 'react';
import { select, pie, arc, scaleOrdinal, schemeSet2 } from 'd3';

import './genderPieChart.css';

function GenderPieChart({ chartWidth, chartHeight, chartRadius, chartData }) {
  const [data, setData] = useState(chartData);

  const svgRef = useRef();

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    // setup svg container
    svg
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .style('overflow', 'visible')
      .style('margin-top', '310px');

    // set up chart
    const formattedData = pie().value((d) => d.value)(data);
    const arcGenerator = arc().innerRadius(0).outerRadius(chartRadius);
    const color = scaleOrdinal().range(schemeSet2);

    // set up svg data
    svg
      .selectAll()
      .data(formattedData)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', (d) => color(d.value))
      .style('opacity', 0, 7);

    // set up annotation
    svg
      .selectAll()
      .data(formattedData)
      .join('text')
      .text((d) => d.data.gender)
      .attr('transform', (d) => `translate(${arcGenerator.centroid})`)
      .style('text-anchor', 'middle');
  }, [data]);

  return (
    <React.Fragment>
      <h1 className="pie-header">Registered Clients By Gender</h1>
      <svg
        className="pie-svg"
        viewBox={`0 0 ${chartHeight} ${chartWidth}`}
        ref={svgRef}
      ></svg>
    </React.Fragment>
  );
}

export default GenderPieChart;
