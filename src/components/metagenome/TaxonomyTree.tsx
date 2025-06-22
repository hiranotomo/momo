import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface TaxonomyTreeProps {
  searchTerm: string;
  onSelectTaxon: (taxon: string) => void;
}

interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
}

const TaxonomyTree: React.FC<TaxonomyTreeProps> = ({ searchTerm, onSelectTaxon }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Sample hierarchical data
    const data: TreeNode = {
      name: "Root",
      children: [
        {
          name: "Bacteria",
          children: [
            {
              name: "Proteobacteria",
              children: [
                { name: "Alphaproteobacteria", value: 120 },
                { name: "Betaproteobacteria", value: 80 },
                { name: "Gammaproteobacteria", value: 95 }
              ]
            },
            {
              name: "Actinobacteria",
              children: [
                { name: "Actinomycetales", value: 65 },
                { name: "Bifidobacteriales", value: 45 }
              ]
            },
            {
              name: "Firmicutes",
              children: [
                { name: "Bacilli", value: 55 },
                { name: "Clostridia", value: 40 }
              ]
            }
          ]
        },
        {
          name: "Archaea",
          children: [
            {
              name: "Euryarchaeota",
              children: [
                { name: "Methanobacteria", value: 30 },
                { name: "Halobacteria", value: 25 }
              ]
            }
          ]
        }
      ]
    };

    const width = 600;
    const height = 500;
    const margin = { top: 20, right: 90, bottom: 30, left: 90 };

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const treemap = d3.tree()
      .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

    const root = d3.hierarchy(data);
    const treeData = treemap(root);

    // Links
    const link = g.selectAll('.link')
      .data(treeData.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        return `M${d.source.y},${d.source.x}
                C${(d.source.y + d.target.y) / 2},${d.source.x}
                 ${(d.source.y + d.target.y) / 2},${d.target.x}
                 ${d.target.y},${d.target.x}`;
      })
      .style('fill', 'none')
      .style('stroke', '#4ade80')
      .style('stroke-width', 2)
      .style('opacity', 0);

    // Nodes
    const node = g.selectAll('.node')
      .data(treeData.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`);

    node.append('circle')
      .attr('r', 5)
      .style('fill', (d: any) => d.children ? '#22d3ee' : '#f59e0b')
      .style('cursor', 'pointer')
      .style('opacity', 0)
      .on('click', (event, d: any) => {
        onSelectTaxon(d.data.name);
        
        // Highlight selected node
        d3.selectAll('.node circle')
          .style('stroke', 'none')
          .style('stroke-width', 0);
        
        d3.select(event.currentTarget)
          .style('stroke', '#ffffff')
          .style('stroke-width', 3);
      });

    node.append('text')
      .attr('dx', (d: any) => d.children ? -10 : 10)
      .attr('dy', '.35em')
      .attr('text-anchor', (d: any) => d.children ? 'end' : 'start')
      .text((d: any) => d.data.name)
      .style('font-size', '12px')
      .style('fill', '#ffffff')
      .style('opacity', 0);

    // Animate appearance
    link.transition()
      .duration(800)
      .delay((d: any, i: number) => i * 50)
      .style('opacity', 0.6);

    node.selectAll('circle')
      .transition()
      .duration(800)
      .delay((d: any, i: number) => i * 50)
      .style('opacity', 1);

    node.selectAll('text')
      .transition()
      .duration(800)
      .delay((d: any, i: number) => i * 50)
      .style('opacity', 1);

    // Search highlighting
    if (searchTerm) {
      node.selectAll('text')
        .style('fill', (d: any) => 
          d.data.name.toLowerCase().includes(searchTerm.toLowerCase()) 
            ? '#4ade80' 
            : '#ffffff'
        )
        .style('font-weight', (d: any) => 
          d.data.name.toLowerCase().includes(searchTerm.toLowerCase()) 
            ? 'bold' 
            : 'normal'
        );
    }

    // Zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

  }, [searchTerm, onSelectTaxon]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-lg p-4 overflow-hidden"
    >
      <svg ref={svgRef}></svg>
      <div className="mt-4 text-xs text-text-secondary">
        Click nodes to view details • Scroll to zoom • Drag to pan
      </div>
    </motion.div>
  );
};

export default TaxonomyTree;