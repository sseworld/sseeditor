import { UnitTest } from '@ephox/bedrock-client';
import { KAssert } from '@ssephox/katamari-assertions';
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
import * as Select from 'ssephox/sugar/api/tag/SelectTag';
UnitTest.test('SelectTagTest', () => {
    const select = SugarElement.fromHtml('<select><option selected="selected" value="myvalue">valx</option><option value="non selected">valy</option></select>');
    const selectVal = Select.getValue(select);
    KAssert.eqSome('eq', 'myvalue', selectVal);
    const emptySelect = SugarElement.fromHtml('<select></select>');
    const emptySelectVal = Select.getValue(emptySelect);
    KAssert.eqNone('eq', emptySelectVal);
});
//# sourceMappingURL=SelectTagTest.js.map