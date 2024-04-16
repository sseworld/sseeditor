import { Assert, UnitTest } from '@ephox/bedrock-client';
import * as Insert from 'ssephox/sugar/api/dom/Insert';
import * as Remove from 'ssephox/sugar/api/dom/Remove';
import * as SugarBody from 'ssephox/sugar/api/node/SugarBody';
import * as Class from 'ssephox/sugar/api/properties/Class';
import * as Css from 'ssephox/sugar/api/properties/Css';
import * as Visibility from 'ssephox/sugar/api/view/Visibility';
import Div from 'ssephox/sugar/test/Div';
UnitTest.test('TogglerTest', () => {
    const runCheck = (toggler, check) => {
        check(false);
        toggler.toggle();
        check(true);
        toggler.toggle();
        check(false);
        toggler.on();
        Assert.eq('', true, toggler.isOn());
        check(true);
        toggler.on();
        Assert.eq('', true, toggler.isOn());
        check(true);
        toggler.off();
        Assert.eq('', false, toggler.isOn());
        check(false);
        toggler.off();
        Assert.eq('', false, toggler.isOn());
        check(false);
        toggler.on();
        toggler.off();
        Assert.eq('', false, toggler.isOn());
        check(false);
    };
    // this is all due for a good refactoring
    const checkClass = (has) => {
        Assert.eq('', has, Class.has(c, 'blob'));
    };
    let c = Div();
    runCheck(Class.toggler(c, 'blob'), checkClass);
    c = Div();
    Insert.append(SugarBody.body(), c);
    runCheck(Class.toggler(c, 'blob'), checkClass);
    Remove.remove(c);
    // CSS toggles are silly - we should delete this and do it in a way that does not require detection
    const checkDisplayBlockRemoved = (has) => {
        const v = has ? 'none' : 'block';
        Assert.eq('', v, Css.get(c, 'display'));
    };
    // behaviour when not connected and not specified - which the link dialog relies on
    c = Div();
    let vis = Visibility.displayToggler(c, 'block');
    Insert.append(SugarBody.body(), c);
    runCheck(vis, checkDisplayBlockRemoved);
    Remove.remove(c);
    const checkDisplayBlockNone = (has) => {
        const v = has ? 'block' : 'none';
        Assert.eq('', v, Css.get(c, 'display'));
    };
    // normal behaviour
    c = Div();
    Css.set(c, 'display', 'none');
    runCheck(Visibility.displayToggler(c, 'block'), checkDisplayBlockNone);
    Insert.append(SugarBody.body(), c);
    runCheck(Visibility.displayToggler(c, 'block'), checkDisplayBlockNone);
    Remove.remove(c);
    const checkVisibilityVisibleRemoved = (has) => {
        const v = has ? 'hidden' : 'visible';
        Assert.eq('', v, Css.get(c, 'visibility'));
    };
    // behaviour when not connected and not specified
    c = Div();
    vis = Visibility.toggler(c);
    Insert.append(SugarBody.body(), c);
    runCheck(vis, checkVisibilityVisibleRemoved);
    Remove.remove(c);
    const checkVisibilityVisibleHidden = (has) => {
        const v = has ? 'visible' : 'hidden';
        Assert.eq('', v, Css.get(c, 'visibility'));
    };
    // normal behaviour
    c = Div();
    Css.set(c, 'visibility', 'hidden');
    runCheck(Visibility.toggler(c), checkVisibilityVisibleHidden);
    Insert.append(SugarBody.body(), c);
    runCheck(Visibility.toggler(c), checkVisibilityVisibleHidden);
    Remove.remove(c);
});
//# sourceMappingURL=TogglerTest.js.map