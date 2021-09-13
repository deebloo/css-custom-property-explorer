import { expect } from '@esm-bundle/chai';

import { ruleContainsCssVar } from './util';

describe('ruleContainsCssVar', () => {
  it('should return true when the rule contains any css vars', () => {
    const testbed = prepareRule(`
      .test {
        color: var(--foo)
      }
    `);

    expect(ruleContainsCssVar(testbed.rule)).to.be.true;

    testbed.cleanUp();
  });
});

function prepareRule(rule: string) {
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
