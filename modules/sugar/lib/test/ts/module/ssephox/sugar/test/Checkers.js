import { Assert } from '@ephox/bedrock-client';
import { Testable } from '@ephox/dispute';
import { KAssert } from '@ssephox/katamari-assertions';
import { tElement } from 'ssephox/sugar/api/node/SugarElementInstances';
import * as SugarNode from 'ssephox/sugar/api/node/SugarNode';
const { tArray } = Testable;
const checkOpt = (expected, actual) => {
    KAssert.eqOptional('eq', expected, actual, tElement());
};
const checkList = (expected, actual) => {
    Assert.eq('eq', expected, actual, tArray(tElement()));
};
const isName = (name) => (x) => SugarNode.name(x) === name;
export { checkOpt, checkList, isName };
//# sourceMappingURL=Checkers.js.map