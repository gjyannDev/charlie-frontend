const fs = require("fs");

const graphPath = process.argv[2];
const graph = JSON.parse(fs.readFileSync(graphPath, "utf8"));
const countBy = (items, key) =>
  items.reduce((acc, item) => {
    const value = item[key] || "unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

console.log(
  JSON.stringify(
    {
      nodes: Array.isArray(graph.nodes) ? graph.nodes.length : 0,
      edges: Array.isArray(graph.edges) ? graph.edges.length : 0,
      nodeTypes: countBy(graph.nodes || [], "type"),
      edgeTypes: countBy(graph.edges || [], "type"),
    },
    null,
    2,
  ),
);
