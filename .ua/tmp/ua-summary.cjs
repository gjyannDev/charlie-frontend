const fs = require("fs");

const graph = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const scan = JSON.parse(fs.readFileSync(process.argv[3], "utf8"));
const countBy = (items, key) =>
  items.reduce((acc, item) => {
    const value = item[key] || "unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

console.log(
  JSON.stringify(
    {
      project: graph.project,
      files: {
        analyzed: scan.totalFiles,
        byCategory: scan.stats?.byCategory || {},
      },
      nodes: {
        total: graph.nodes.length,
        byType: countBy(graph.nodes, "type"),
      },
      edges: {
        total: graph.edges.length,
        byType: countBy(graph.edges, "type"),
      },
      layers: graph.layers.map((layer) => layer.name),
      tourSteps: graph.tour.length,
    },
    null,
    2,
  ),
);
