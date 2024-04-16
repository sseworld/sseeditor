import { Assert, UnitTest } from '@ephox/bedrock-client';
import { KAssert } from '@ssephox/katamari-assertions';
import * as InsertAll from 'ssephox/sugar/api/dom/InsertAll';
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
import * as Checked from 'ssephox/sugar/api/properties/Checked';
import * as Value from 'ssephox/sugar/api/properties/Value';
UnitTest.test('CheckedTest', () => {
    const container = SugarElement.fromTag('div');
    const alpha = SugarElement.fromHtml('<input type="radio" value="alpha"></input>');
    const beta = SugarElement.fromHtml('<input type="radio" value="beta"></input>');
    const gamma = SugarElement.fromHtml('<input type="radio" value="gamma"></input>');
    InsertAll.append(container, [alpha, beta, gamma]);
    KAssert.eqNone('eq', Checked.find(container));
    Assert.eq('Alpha checked value should be false', false, Checked.get(alpha));
    Checked.set(beta, true);
    Assert.eq('Beta checked value should be true', true, Checked.get(beta));
    KAssert.eqSome('eq', 'beta', Checked.find(container).map(Value.get));
    Checked.set(alpha, true);
    Assert.eq('Alpha checked value should be true', true, Checked.get(alpha));
    KAssert.eqSome('eq', 'alpha', Checked.find(container).map(Value.get));
});
//# sourceMappingURL=CheckedTest.js.map