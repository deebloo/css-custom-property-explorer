import { Network } from "vis-network/esnext/esm";
import { DataSet } from "vis-data/esnext/esm";

import { Graph, Vertex } from "./graph";

// Nodes are a flat list of all rules
const verticeies = Array.from(document.styleSheets)
  .flatMap((sheet) => Array.from(sheet.rules) as CSSStyleRule[])
  .map((rule, i) => new Vertex(i, rule));

const graph = new Graph(verticeies);

graph.determineVarEdges();

console.log(graph.edges);

new Network(
  document.getElementById("network") as HTMLDivElement,
  {
    nodes: new DataSet(graph.verticies),
    edges: new DataSet(graph.edges as any[]),
  },
  {}
);
