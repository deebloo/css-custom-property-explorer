import { Network } from "vis-network/esnext";
import { DataSet } from "vis-data/esnext";

import { Graph, Vertex } from "./graph";

// Nodes are a flat list of all rules
const verticeies = Array.from(document.styleSheets)
  .flatMap((sheet) => Array.from(sheet.rules) as CSSStyleRule[])
  .map((rule, i) => new Vertex(i, rule));

const graph = new Graph(verticeies);

graph.determineVarEdges();

new Network(
  document.getElementById("network") as HTMLDivElement,
  {
    nodes: new DataSet(graph.verticies),
    edges: new DataSet(graph.edges as any[]),
  },
  {}
);
