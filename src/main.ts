import { Graph, Vertex } from "./graph";

// Nodes are a flat list of all rules
const verticeies = Array.from(document.styleSheets)
  .flatMap((sheet) => Array.from(sheet.rules) as CSSStyleRule[])
  .map((rule) => new Vertex(rule));

const graph = new Graph(verticeies);

graph.findCSSVarEdges();

console.log("EDGES:", graph.edges);
