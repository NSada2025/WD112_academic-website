---
layout: single
title: "Paper Network Graph"
permalink: /paper-graph/
author_profile: true
excerpt: "Interactive visualization of research papers and their connections, showing the network of ideas linking neuroscience, methods, and theories."
---

# Research Paper Network

Interactive visualization of research papers and their connections, inspired by Obsidian's graph view.

<div id="paper-network" style="width: 100%; height: 600px; border: 1px solid #ddd; border-radius: 8px;"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.26.0/cytoscape.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function(){
  // Initialize Cytoscape
  var cy = cytoscape({
    container: document.getElementById('paper-network'),
    
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#4fc3f7',
          'label': 'data(label)',
          'text-valign': 'center',
          'text-halign': 'center',
          'text-outline-color': '#fff',
          'text-outline-width': 2,
          'font-size': '12px',
          'width': 'label',
          'height': 'label',
          'padding': '10px',
          'shape': 'roundrectangle'
        }
      },
      {
        selector: 'node[type="method"]',
        style: {
          'background-color': '#81c784'
        }
      },
      {
        selector: 'node[type="disease"]',
        style: {
          'background-color': '#ff8a65'
        }
      },
      {
        selector: 'node[type="theory"]',
        style: {
          'background-color': '#ba68c8'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'opacity': 0.7
        }
      },
      {
        selector: 'node:selected',
        style: {
          'background-color': '#ffeb3b',
          'border-width': 3,
          'border-color': '#fbc02d'
        }
      }
    ],
    
    elements: [
      // Nodes - Papers and Concepts
      { data: { id: 'hdac', label: 'HDAC Research\n(Cell Death & Disease)', type: 'paper' } },
      { data: { id: 'msa', label: 'MSA Research\n(Current)', type: 'paper' } },
      { data: { id: 'huntington', label: 'Huntington\'s Disease\n(Collaboration)', type: 'paper' } },
      { data: { id: 'active-inference', label: 'Active Inference\n(Future Direction)', type: 'theory' } },
      
      // Methods
      { data: { id: 'omics', label: 'Omics Analysis', type: 'method' } },
      { data: { id: 'protein-agg', label: 'Protein Aggregation', type: 'method' } },
      { data: { id: 'lipid-meta', label: 'Lipid Metabolism', type: 'method' } },
      
      // Diseases
      { data: { id: 'neurodegeneration', label: 'Neurodegeneration', type: 'disease' } },
      { data: { id: 'brain-injury', label: 'Brain Injury', type: 'disease' } },
      
      // Theories
      { data: { id: 'plasticity', label: 'Neural Plasticity', type: 'theory' } },
      { data: { id: 'consciousness', label: 'Consciousness', type: 'theory' } },
      
      // Edges - Connections
      { data: { source: 'hdac', target: 'brain-injury' } },
      { data: { source: 'hdac', target: 'plasticity' } },
      { data: { source: 'msa', target: 'neurodegeneration' } },
      { data: { source: 'msa', target: 'protein-agg' } },
      { data: { source: 'msa', target: 'lipid-meta' } },
      { data: { source: 'msa', target: 'omics' } },
      { data: { source: 'huntington', target: 'neurodegeneration' } },
      { data: { source: 'huntington', target: 'protein-agg' } },
      { data: { source: 'active-inference', target: 'consciousness' } },
      { data: { source: 'active-inference', target: 'plasticity' } },
      { data: { source: 'neurodegeneration', target: 'active-inference' } }
    ],
    
    layout: {
      name: 'cose',
      animate: true,
      randomize: false,
      componentSpacing: 100,
      nodeRepulsion: 400000,
      edgeElasticity: 100,
      nestingFactor: 5,
      gravity: 80,
      numIter: 1000,
      initialTemp: 200,
      coolingFactor: 0.95,
      minTemp: 1.0
    }
  });
  
  // Add click event
  cy.on('tap', 'node', function(evt){
    var node = evt.target;
    console.log('Clicked on: ' + node.data('label'));
    // Future: Add modal or redirect to paper details
  });
  
  // Add hover effect
  cy.on('mouseover', 'node', function(evt){
    var node = evt.target;
    node.style('border-width', 3);
    node.style('border-color', '#333');
  });
  
  cy.on('mouseout', 'node', function(evt){
    var node = evt.target;
    node.style('border-width', 0);
  });
});
</script>

## Legend

<div style="margin-top: 20px;">
  <span style="display: inline-block; width: 20px; height: 20px; background-color: #4fc3f7; margin-right: 5px; vertical-align: middle;"></span> Research Papers
  <span style="display: inline-block; width: 20px; height: 20px; background-color: #81c784; margin-left: 20px; margin-right: 5px; vertical-align: middle;"></span> Methods
  <span style="display: inline-block; width: 20px; height: 20px; background-color: #ff8a65; margin-left: 20px; margin-right: 5px; vertical-align: middle;"></span> Diseases
  <span style="display: inline-block; width: 20px; height: 20px; background-color: #ba68c8; margin-left: 20px; margin-right: 5px; vertical-align: middle;"></span> Theories
</div>

## About This Visualization

This interactive graph shows the connections between my research papers, methodologies, disease areas, and theoretical frameworks. Click and drag to explore the network, and click on nodes for more information (feature coming soon).

The visualization will be automatically updated as new papers and blog posts are added to the site.