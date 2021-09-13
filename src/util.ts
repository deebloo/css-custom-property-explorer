export function ruleContainsCssVar(rule: CSSStyleRule): boolean {
  for (let style of rule.style) {
    if (rule.style.getPropertyValue(style).startsWith('var(')) {
      return true;
    }
  }

  return false;
}

export function findCssVarNames(rule: CSSStyleRule): string[] {
  const vars: string[] = [];

  for (let style of rule.style) {
    const styleValue = rule.style.getPropertyValue(style);
    if (styleValue.startsWith('var(')) {
      vars.push(styleValue.replace('var(', '').replace(')', ''));
    }
  }

  return vars;
}
