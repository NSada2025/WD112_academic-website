// Research network data
const networkData = {
  nodes: [
    { id: "neuro", label: "Neurodegeneration", category: "neuroscience", size: 30 },
    { id: "protein", label: "Protein Aggregation", category: "biochemistry", size: 25 },
    { id: "ml", label: "Machine Learning", category: "computing", size: 20 },
    { id: "music", label: "Music & Brain", category: "art", size: 15 },
    { id: "philosophy", label: "Active Inference", category: "philosophy", size: 20 },
    { id: "startup", label: "Entrepreneurship", category: "business", size: 15 }
  ],
  links: [
    { source: "neuro", target: "protein", strength: 0.9 },
    { source: "neuro", target: "ml", strength: 0.7 },
    { source: "neuro", target: "music", strength: 0.5 },
    { source: "protein", target: "ml", strength: 0.6 },
    { source: "philosophy", target: "neuro", strength: 0.8 },
    { source: "philosophy", target: "ml", strength: 0.7 },
    { source: "startup", target: "ml", strength: 0.6 }
  ]
};

// Color scheme for categories
const categoryColors = {
  neuroscience: "#3b82f6",
  biochemistry: "#10b981",
  computing: "#8b5cf6",
  art: "#f59e0b",
  philosophy: "#ef4444",
  business: "#6b7280"
};

// Initialize D3 force simulation
const width = document.getElementById('network-container').offsetWidth;
const height = 600;

const svg = d3.select("#network-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const g = svg.append("g");

// Create force simulation
const simulation = d3.forceSimulation(networkData.nodes)
  .force("link", d3.forceLink(networkData.links).id(d => d.id).distance(100))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(d => d.size + 10));

// Create links
const link = g.append("g")
  .selectAll("line")
  .data(networkData.links)
  .join("line")
  .attr("class", "link")
  .attr("stroke-width", d => Math.sqrt(d.strength * 5));

// Create nodes
const node = g.append("g")
  .selectAll("g")
  .data(networkData.nodes)
  .join("g")
  .attr("class", "node")
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

// Add circles to nodes
node.append("circle")
  .attr("r", d => d.size)
  .attr("fill", d => categoryColors[d.category]);

// Add labels to nodes
node.append("text")
  .text(d => d.label)
  .attr("x", 0)
  .attr("y", d => d.size + 15)
  .attr("text-anchor", "middle");

// Tooltip
const tooltip = d3.select(".tooltip");

node.on("mouseover", function(event, d) {
  tooltip.style("opacity", 1)
    .html(`<strong>${d.label}</strong><br>Category: ${d.category}`)
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 10) + "px");
})
.on("mouseout", function() {
  tooltip.style("opacity", 0);
});

// Update positions on tick
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("transform", d => `translate(${d.x},${d.y})`);
});

// Drag functions
function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

// Zoom functionality
const zoom = d3.zoom()
  .scaleExtent([0.5, 3])
  .on("zoom", (event) => {
    g.attr("transform", event.transform);
  });

svg.call(zoom);