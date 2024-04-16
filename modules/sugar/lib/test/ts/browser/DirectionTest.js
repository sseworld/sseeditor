import { Assert, UnitTest } from '@ephox/bedrock-client';
import * as Insert from 'ssephox/sugar/api/dom/Insert';
import * as Remove from 'ssephox/sugar/api/dom/Remove';
import * as SugarBody from 'ssephox/sugar/api/node/SugarBody';
import * as Attribute from 'ssephox/sugar/api/properties/Attribute';
import * as Direction from 'ssephox/sugar/api/properties/Direction';
import EphoxElement from 'ssephox/sugar/test/EphoxElement';
UnitTest.test('DirectionTest', () => {
    const el = EphoxElement('div');
    const body = SugarBody.body();
    const appendToDom = (element) => {
        Insert.append(body, element);
    };
    const assertDirection = (element, expectedDirection) => {
        appendToDom(element);
        const dir = Direction.getDirection(element);
        Assert.eq('', expectedDirection, dir);
        Remove.remove(element);
    };
    const assertOnDirection = (element, isLeftReturnThis, isRightReturnThis, expectedOn) => {
        appendToDom(element);
        const onDirection = Direction.onDirection(isLeftReturnThis, isRightReturnThis);
        Assert.eq('', expectedOn, onDirection(element));
        Remove.remove(element);
    };
    assertDirection(el, 'ltr');
    assertOnDirection(el, 'isLeft', 'isRight', 'isLeft');
    const arabicElement = EphoxElement('div');
    Attribute.setAll(arabicElement, { lang: 'ar', dir: 'rtl' });
    assertDirection(arabicElement, 'rtl');
    assertOnDirection(arabicElement, 'isLeft', 'isRight', 'isRight');
});
//# sourceMappingURL=DirectionTest.js.map