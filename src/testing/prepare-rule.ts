export function prepareRule(rule: string) {
  const styleEl = document.createElement('style');

  document.head.appendChild(styleEl);

  styleEl.sheet?.insertRule(rule);

  return {
    rule: styleEl.sheet?.cssRules[0] as CSSStyleRule,
    cleanUp() {
      document.head.removeChild(styleEl);
    },
  };
}
