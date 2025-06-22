import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  group: 'microbe' | 'plant' | 'metabolite';
  radius: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
  type: 'symbiotic' | 'parasitic' | 'neutral';
}

const NetworkGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    // Generate sample data
    const nodes: Node[] = [
      { id: 'Nostoc', group: 'microbe', radius: 20 },
      { id: 'Bryum', group: 'plant', radius: 25 },
      { id: 'Syntrichia', group: 'plant', radius: 22 },
      { id: 'Bacillus', group: 'microbe', radius: 18 },
      { id: 'Pseudomonas', group: 'microbe', radius: 19 },
      { id: 'Auxin', group: 'metabolite', radius: 15 },
      { id: 'Cytokinin', group: 'metabolite', radius: 15 },
      { id: 'N-compounds', group: 'metabolite', radius: 16 }
    ];

    const links: Link[] = [
      { source: 'Nostoc', target: 'Bryum', value: 5, type: 'symbiotic' },
      { source: 'Nostoc', target: 'Auxin', value: 3, type: 'symbiotic' },
      { source: 'Bryum', target: 'Cytokinin', value: 4, type: 'neutral' },
      { source: 'Bacillus', target: 'Syntrichia', value: 4, type: 'symbiotic' },
      { source: 'Pseudomonas', target: 'N-compounds', value: 5, type: 'symbiotic' },
      { source: 'N-compounds', target: 'Bryum', value: 3, type: 'neutral' },
      { source: 'Auxin', target: 'Syntrichia', value: 2, type: 'symbiotic' }
    ];

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Define color scale
    const color = d3.scaleOrdinal()
      .domain(['microbe', 'plant', 'metabolite'])
      .range(['#4ade80', '#22d3ee', '#f59e0b']);

    const linkColor = d3.scaleOrdinal()
      .domain(['symbiotic', 'parasitic', 'neutral'])
      .range(['#4ade80', '#ef4444', '#94a3b8']);

    // Create force simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.radius + 5));

    // Add links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', d => linkColor(d.type) as string)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.value) * 2);

    // Add nodes
    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => color(d.group) as string)
      .attr('stroke', '#1e3a5f')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    // Add labels
    const label = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .text(d => d.id)
      .style('font-size', '12px')
      .style('fill', '#ffffff')
      .style('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em');

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

    node
      .on('mouseover', function(event, d) {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(`${d.id}<br/>Type: ${d.group}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
        
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.radius * 1.2);
      })
      .on('mouseout', function(event, d) {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
        
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.radius);
      });

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
      d3.select('body').selectAll('.tooltip').remove();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center"
    >
      <svg ref={svgRef}></svg>
    </motion.div>
  );
};

export default NetworkGraph;