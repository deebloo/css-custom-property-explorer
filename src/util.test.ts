import { expect } from '@esm-bundle/chai';

import { prepareRule } from './testing/prepare-rule';
import { ruleContainsCssVar, findCssVarNames } from './util';

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

  it('should return a list of all used css vars', () => {
    const testbed = prepareRule(`
      .test {
        color: var(--foo);
        background-color: var(--bar);
      }
    `);

    expect(findCssVarNames(testbed.rule)).to.deep.equal(['--foo', '--bar']);

    testbed.cleanUp();
  });
});
