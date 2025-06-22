import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

const HeatmapView: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Sample data
    const species = ['Nostoc sp.', 'Bryum argenteum', 'Syntrichia ruralis', 'Physcomitrella patens', 'Marchantia polymorpha'];
    const metabolites = ['Auxin', 'Cytokinin', 'Gibberellin', 'ABA', 'Ethylene', 'Jasmonic acid', 'Salicylic acid'];
    
    const data: { species: string; metabolite: string; value: number }[] = [];
    species.forEach(sp => {
      metabolites.forEach(met => {
        data.push({
          species: sp,
          metabolite: met,
          value: Math.random() * 100
        });
      });
    });

    const margin = { top: 80, right: 50, bottom: 100, left: 150 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(metabolites)
      .padding(0.05);

    const y = d3.scaleBand()
      .range([height, 0])
      .domain(species)
      .padding(0.05);

    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateViridis)
      .domain([0, 100]);

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)')
      .style('fill', '#94a3b8');

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', '#94a3b8');

    // Add heatmap cells
    const cells = g.selectAll()
      .data(data, (d: any) => d.species + ':' + d.metabolite)
      .enter()
      .append('rect')
      .attr('x', d => x(d.metabolite)!)
      .attr('y', d => y(d.species)!)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => colorScale(d.value))
      .style('opacity', 0);

    // Animate cells appearing
    cells.transition()
      .duration(800)
      .delay((d, i) => i * 10)
      .style('opacity', 1);

    // Add tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', '#1e3a5f')
      .style('border-radius', '8px')
      .style('padding', '8px')
      .style('font-size', '12px')
      .style('color', 'white')
      .style('pointer-events', 'none');

    cells
      .on('mouseover', function(event, d) {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(`${d.species}<br/>${d.metabolite}: ${d.value.toFixed(1)}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
        
        d3.select(this)
          .style('stroke', 'white')
          .style('stroke-width', '2px');
      })
      .on('mouseout', function(d) {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
        
        d3.select(this)
          .style('stroke', 'none');
      });

    // Add title
    svg.append('text')
      .attr('x', (width + margin.left + margin.right) / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', '#ffffff')
      .text('Metabolite Production Heatmap');

    // Cleanup
    return () => {
      d3.select('body').selectAll('.tooltip').remove();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center overflow-x-auto"
    >
      <svg ref={svgRef}></svg>
    </motion.div>
  );
};

export default HeatmapView;