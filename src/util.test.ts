import { expect } from '@esm-bundle/chai';

import { prepareRule } from './testing/prepare-rule';
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
