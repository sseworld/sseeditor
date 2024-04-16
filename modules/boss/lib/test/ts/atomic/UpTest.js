import { Assert, UnitTest } from '@ephox/bedrock-client';
import { Arr, Optional } from '@ssephox/katamari';
import { KAssert } from '@ssephox/katamari-assertions';
import { Gene } from 'ssephox/boss/api/Gene';
import * as Locator from 'ssephox/boss/mutant/Locator';
import * as Tracks from 'ssephox/boss/mutant/Tracks';
import * as Up from 'ssephox/boss/mutant/Up';
UnitTest.test('UpTest', () => {
    const family = Tracks.track(Gene('A', '_A_', [
        Gene('B', '_B_'),
        Gene('C', '_C_', [
            Gene('D', '_D_', [
                Gene('E', '_E_')
            ]),
            Gene('F', '_F_')
        ])
    ]), Optional.none());
    const getId = (x) => x.id;
    const selectorId = (item, query) => Up.selector(item, query).map(getId);
    const closestId = (item, query) => Up.closest(item, query).map(getId);
    const d = Locator.byId(family, 'D').getOrDie();
    KAssert.eqSome('eq', 'A', selectorId(d, '_A_'));
    KAssert.eqSome('eq', 'A', closestId(d, '_A_'));
    KAssert.eqSome('eq', 'C', selectorId(d, '_C_'));
    KAssert.eqSome('eq', 'C', closestId(d, '_C_'));
    KAssert.eqNone('eq', selectorId(d, '_D_'));
    KAssert.eqSome('eq', 'D', closestId(d, '_D_'));
    KAssert.eqSome('eq', 'D', closestId(d, '_A_,_D_'));
    KAssert.eqSome('eq', 'D', closestId(d, '_A_,_D_,_B_'));
    KAssert.eqSome('eq', 'C', selectorId(d, '_C_,_A_'));
    KAssert.eqSome('eq', 'C', closestId(d, '_C_,_A_'));
    KAssert.eqSome('eq', 'C', selectorId(d, '_B_,_C_,_A_'));
    KAssert.eqSome('eq', 'C', closestId(d, '_B_,_C_,_A_'));
    KAssert.eqSome('eq', 'C', selectorId(d, '_B_,_A_,_C_'));
    KAssert.eqSome('eq', 'C', closestId(d, '_B_,_A_,_C_'));
    KAssert.eqNone('eq', selectorId(d, '_B_,_Z_'));
    KAssert.eqNone('eq', closestId(d, '_B_,_Z_'));
    KAssert.eqSome('eq', 'A', Up.predicate(d, (item) => item.id === 'A').map(getId));
    KAssert.eqNone('eq', Up.predicate(d, (item) => item.id === 'root'));
    const checkAll = (expected, start) => {
        const actual = Locator.byId(family, start).map((item) => {
            const result = Up.all(item);
            return Arr.map(result, getId).join(',');
        });
        KAssert.eqSome('eq', expected, actual);
    };
    checkAll('D,C,A', 'E');
    checkAll('C,A', 'F');
    checkAll('', 'A');
    checkAll('A', 'B');
    Assert.eq('eq', 'A', Up.top(d).id);
});
//# sourceMappingURL=UpTest.js.map