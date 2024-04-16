import { Assert, UnitTest } from '@ephox/bedrock-client';
import { Arr } from '@ssephox/katamari';
import { KAssert } from '@ssephox/katamari-assertions';
import * as Compare from 'ssephox/sugar/api/dom/Compare';
import * as Insert from 'ssephox/sugar/api/dom/Insert';
import * as Remove from 'ssephox/sugar/api/dom/Remove';
import * as SugarBody from 'ssephox/sugar/api/node/SugarBody';
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
import * as Css from 'ssephox/sugar/api/properties/Css';
import Div from 'ssephox/sugar/test/Div';
UnitTest.test('ElementFromPointTest', () => {
    const a = Div();
    const bg = Div();
    const placeElm = (elm, x, y, w, h) => {
        Css.setAll(elm, {
            position: 'fixed',
            left: x + 'px',
            top: y + 'px',
            width: w + 'px',
            height: h + 'px',
            background: 'red'
        });
    };
    const getAt = (elm, placeX, placeY, testX, testY) => {
        placeElm(elm, placeX, placeY, 100, 50);
        return SugarElement.fromPoint(SugarElement.fromDom(document), testX, testY);
    };
    const checkMatch = (p, placeX, placeY, expectedElm, testX, testY) => {
        const actualElm = getAt(p, placeX, placeY, testX, testY).getOrDie('Should be some element.');
        // debugger
        Assert.eq('Should be expected element', true, Compare.eq(expectedElm, actualElm));
    };
    const checkNone = (p, placeX, placeY, testX, testY) => {
        KAssert.eqNone('Should be none', getAt(p, placeX, placeY, testX, testY));
    };
    Arr.each([bg, a], (elm) => {
        Insert.append(SugarBody.body(), elm);
    });
    placeElm(bg, 0, 0, 200, 200);
    checkMatch(a, 10, 10, a, 20, 20);
    checkMatch(a, 10, 10, a, 20, 59);
    checkMatch(a, 10, 10, a, 109, 59);
    checkMatch(a, 10, 10, bg, 110, 60);
    checkMatch(a, 10, 20, bg, 10, 10);
    checkMatch(a, 20, 10, bg, 10, 10);
    checkMatch(a, 20, 20, bg, 10, 10);
    checkNone(a, 0, 0, -1000, -1000);
    Arr.each([bg, a], Remove.remove);
});
//# sourceMappingURL=ElementFromPointTest.js.map