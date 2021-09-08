export class Vertex {
  public styles: Map<string, string> = new Map();

  constructor(public readonly rule: CSSStyleRule) {
    this.parseRule();
  }

  private parseRule() {
    for (let style of this.rule.style) {
      this.styles.set(style, this.rule.style.getPropertyValue(style));
    }
  }
}

export class Edge {
  constructor(public readonly from: Vertex, public readonly to: Vertex) {}
}

export class Graph {
  public edges: Edge[] = [];

  constructor(public readonly verticies: Vertex[]) {}

  findCSSVarEdges() {
    let vertex: Vertex;

    for (let i = 0; i < this.verticies.length; i++) {
      vertex = this.verticies[i];

      const parent = this.findCSSVarParent(vertex);

      if (parent) {
        this.edges.push(new Edge(vertex, parent));
      }
    }
  }

  findCSSVarParent(vertex: Vertex): Vertex | null {
    for (let style of vertex.styles) {
      if (this.isCSSVar(style[1])) {
        const varName = this.getVariableName(style[1]);

        const parent = this.verticies.find((v) => {
          for (let style of v.styles) {
            if (style[0] === varName) {
              return v;
            }
          }
        });

        if (parent) {
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
