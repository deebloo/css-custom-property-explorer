interface CSSVariableReferenceValue {
  fallback: string | null;
  variable: string;
}

interface CSSUnparsedValue {
  [key: number]: string | CSSVariableReferenceValue;
}

interface CSSStyleRule {
  styleMap: Map<string, CSSUnparsedValue>;
}
