import { Network, Edge } from 'vis-network/esnext';
import { DataSet } from 'vis-data/esnext';
import {
  findCssVarDeclaration,
  findCssVarNames,
  ruleContainsCssVar,
} from './util';

/**
 * 1. Flatten all sheets into a single set of  rules
 * 2. Filter down to rules that include a var declaration or reference
 */
const rules: CSSStyleRule[] = Array.from(document.styleSheets).flatMap(
  (sheet) => Array.from(sheet.cssRules) as CSSStyleRule[]
);
// .filter((rule) => {
//   for (let style of rule.style) {
//     if (style.startsWith("--")) {
//       return true;
//     } else if (rule.style.getPropertyValue(style).startsWith("var(")) {
//       return true;
//     }
//   }
// });

const nodes = [];
const edges: Edge[] = [];

/**
 * Create a Tree Walker and skip over any nodes that aren't using css custom properties
 */
const walker = document.createTreeWalker(
  document.getElementById('container') as HTMLElement,
  NodeFilter.SHOW_ELEMENT
);

var currentNode: Node | null = walker.currentNode;

let nodeId = 0;

while (currentNode) {
  nodes.push(currentNode);

  const n = currentNode as HTMLElement;

  if (n.parentElement) {
    edges.push({
      from: 'node_' + nodes.indexOf(n.parentElement),
      to: 'node_' + nodeId,
    });
  }

  let rule: CSSStyleRule;

  for (let i = 0; i < rules.length; i++) {
    rule = rules[i] as CSSStyleRule;

    if (n.matches(rules[i]!.selectorText)) {
      edges.push({ from: 'rule_' + i, to: 'node_' + nodeId });

      // 1. If rules contains css var usage
      if (ruleContainsCssVar(rule)) {
        // 2. FInd all css var names for rule
        const vars = findCssVarNames(rule);

        vars.forEach((name) => {
          // 3. for each var use, walk up the tree to find the first parent that declars that var
          const res = findCssVarDeclaration(n, name, rules);

          if (res !== null) {
            // 4. draw edge between that parent rule and this rule.
            edges.push({ from: 'rule_' + res, to: 'rule_' + i });
          }
        });
      }
    }
  }

  nodeId++;

  currentNode = walker.nextNode();
}

console.log(nodes);
console.log(rules);
console.log(edges);

new Network(
  document.getElementById('network') as HTMLDivElement,
  {
    nodes: new DataSet([
      ...nodes.map((n, i) => ({
        id: 'node_' + i,
        label: 'EL:' + n.nodeName,
      })),
      ...rules.map((r, i) => ({
        id: 'rule_' + i,
        label: 'CSS:' + r.selectorText,
      })),
    ]),
    edges: new DataSet(edges),
  },
  {
    nodes: {
      shape: 'circle',
    },
    edges: {
      arrows: {
        to: true,
      },
    },
    layout: {},
  }
);
