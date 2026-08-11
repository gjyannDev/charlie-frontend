const fs = require("fs");
const path = require("path");

const root = process.argv[2];
const commit = process.argv[3];
const uaDir = path.join(root, ".ua");
const intermediate = path.join(uaDir, "intermediate");

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const assembled = readJson(path.join(intermediate, "assembled-graph.json"));
const scan = readJson(path.join(intermediate, "scan-result.json"));
let layers = readJson(path.join(intermediate, "layers.json"));
let tour = readJson(path.join(intermediate, "tour.json"));

const allowedEdgeTypes = new Set([
  "imports",
  "exports",
  "contains",
  "inherits",
  "implements",
  "calls",
  "subscribes",
  "publishes",
  "middleware",
  "reads_from",
  "writes_to",
  "transforms",
  "validates",
  "depends_on",
  "tested_by",
  "configures",
  "related",
  "similar_to",
  "deploys",
  "serves",
  "provisions",
  "triggers",
  "migrates",
  "documents",
  "routes",
  "defines_schema",
]);

const edgeTypeMap = {
  documents_convention_for: "documents",
  documents_design_tokens: "documents",
  uses_utility_class: "depends_on",
  renders_component: "calls",
  imports_stylesheet: "imports",
  wraps_component: "calls",
  uses: "depends_on",
};

const fileLevelTypes = new Set([
  "file",
  "config",
  "document",
  "service",
  "pipeline",
  "table",
  "schema",
  "resource",
  "endpoint",
]);

const nodeIds = new Set((assembled.nodes || []).map((node) => node.id));
const fileNodeIds = new Set(
  (assembled.nodes || [])
    .filter((node) => fileLevelTypes.has(node.type))
    .map((node) => node.id),
);

for (const node of assembled.nodes || []) {
  if (!node.summary) node.summary = "No summary available";
  if (!Array.isArray(node.tags) || node.tags.length === 0) node.tags = ["untagged"];
  if (!node.complexity) node.complexity = "simple";
}

for (const edge of assembled.edges || []) {
  edge.type = edgeTypeMap[edge.type] || edge.type;
  if (!allowedEdgeTypes.has(edge.type)) edge.type = "related";
  if (typeof edge.weight !== "number") edge.weight = 0.5;
}

assembled.edges = (assembled.edges || []).filter(
  (edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target),
);

if (layers && !Array.isArray(layers) && Array.isArray(layers.layers)) layers = layers.layers;
if (!Array.isArray(layers)) layers = [];
layers = layers.map((layer, index) => {
  const name = layer.name || `Layer ${index + 1}`;
  const id =
    layer.id ||
    `layer:${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  const refs = layer.nodeIds || layer.nodes || [];
  return {
    id,
    name,
    description: layer.description || "Codebase layer.",
    nodeIds: refs
      .map((ref) => (typeof ref === "string" ? ref : ref && ref.id))
      .filter((id) => fileNodeIds.has(id)),
  };
});

if (tour && !Array.isArray(tour) && Array.isArray(tour.steps)) tour = tour.steps;
if (!Array.isArray(tour)) tour = [];
tour = tour
  .map((step, index) => {
    const refs = step.nodeIds || step.nodesToInspect || [];
    const normalized = {
      order: Number.isFinite(step.order) ? step.order : index + 1,
      title: step.title || `Step ${index + 1}`,
      description: step.description || step.whyItMatters || "Explore this part of the codebase.",
      nodeIds: refs
        .map((ref) => (typeof ref === "string" ? ref : ref && ref.id))
        .filter((id) => fileNodeIds.has(id)),
    };
    if (typeof step.languageLesson === "string") normalized.languageLesson = step.languageLesson;
    return normalized;
  })
  .sort((a, b) => a.order - b.order);

const graph = {
  version: "1.0.0",
  project: {
    name: "my-app",
    languages: Object.keys(scan.stats?.byLanguage || {}),
    frameworks: ["Next.js", "React", "Tailwind CSS"],
    description: "Next.js frontend application with reusable UI primitives, shared form wrappers, API utilities, and project documentation.",
    analyzedAt: new Date().toISOString(),
    gitCommitHash: commit,
  },
  nodes: assembled.nodes || [],
  edges: assembled.edges || [],
  layers,
  tour,
};

fs.writeFileSync(path.join(intermediate, "assembled-graph.json"), JSON.stringify(graph, null, 2));
