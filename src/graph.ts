export class Vertex {
  public styles: Map<string, string> = new Map();
  public label: string;

  constructor(public readonly id: number, public readonly rule: CSSStyleRule) {
    this.label = this.rule.selectorText;

    this.parseRule();
  }

  private parseRule() {
    for (let style of this.rule.style) {
      this.styles.set(style, this.rule.style.getPropertyValue(style));
    }
  }
}

export class Edge {
  constructor(public readonly from: number, public readonly to: number) {}
}

export class Graph {
  public edges: Edge[] = [];

  constructor(public readonly verticies: Vertex[]) {}

  determineVarEdges() {
    let vertex: Vertex;

    for (let i = 0; i < this.verticies.length; i++) {
      vertex = this.verticies[i];

      const parent = this.findCSSVarParent(vertex);

      if (typeof parent !== undefined && parent !== null) {
        this.edges.push(new Edge(i, parent));
      }
    }
  }

  findCSSVarParent(vertex: Vertex): number | null {
    for (let style of vertex.styles) {
      if (this.isCSSVar(style[1])) {
        const varName = this.getVariableName(style[1]);

        const parent = this.verticies.findIndex((v) => {
          for (let style of v.styles) {
            if (style[0] === varName) {
              return v;
            }
          }
        });

        if (typeof parent !== undefined) {
          return parent;
        }
      }
    }

    return null;
  }

  private isCSSVar(style: string) {
    return style.startsWith("var(");
  }

  private getVariableName(val: string) {
    val = val.replace("var(", "");

    return val.replace(")", "");
  }
}
