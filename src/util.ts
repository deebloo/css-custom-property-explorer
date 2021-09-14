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
    // TODO: This does not work for shorthand like "background"
    const styleValue = rule.style.getPropertyValue(style);

    if (styleValue.startsWith('var(')) {
      vars.push(styleValue.replace('var(', '').replace(')', ''));
    }
  }

  return vars;
}

export function findCssVarDeclaration(
  el: HTMLElement,
  cssVar: string,
  rules: CSSStyleRule[]
): number | null {
  if (el.parentElement) {
    let rule: CSSStyleRule;

    for (let i = 0; i < rules.length; i++) {
      rule = rules[i] as CSSStyleRule;

      if (el.parentElement.matches(rule.selectorText)) {
        if (Object.values(rule.style).includes(cssVar)) {
          return i;
        }
      }
    }

    return findCssVarDeclaration(el.parentElement, cssVar, rules);
  }

  return null;
}
