import { Assert, UnitTest } from '@ephox/bedrock-client';
import { Optional } from '@ssephox/katamari';
import { KAssert } from "@ssephox/katamari-assertions";
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
import * as Attribute from 'ssephox/sugar/api/properties/Attribute';
import Div from 'ssephox/sugar/test/Div';
UnitTest.test('AttributeTest', () => {
    const c = Div();
    const checkErr = (f, element, k, v) => {
        try {
            f(element, k, v);
        }
        catch (e) {
            // expected
            return;
        }
        Assert.fail('function did not throw an error');
    };
    const checkTypeErr = (e) => {
        checkErr(Attribute.get, e, 'id');
        checkErr(Attribute.set, e, 'id', '');
        checkErr(Attribute.setAll, e, { id: '' });
        checkErr(Attribute.remove, e, 'id');
        // has just returns false now, no point in errors
        Assert.eq('does not have key', false, Attribute.has(e, 'id'));
    };
    const check = (k, v1, v2) => {
        Assert.eq('has', false, Attribute.has(c, k));
        Assert.eq('get', undefined, Attribute.get(c, k));
        KAssert.eqNone('getOpt', Attribute.getOpt(c, k));
        Attribute.set(c, k, v1);
        Assert.eq('has', true, Attribute.has(c, k));
        Assert.eq('get', v1, Attribute.get(c, k));
        KAssert.eqSome('getOpt', v1, Attribute.getOpt(c, k));
        Attribute.set(c, k, v2);
        Assert.eq('has', true, Attribute.has(c, k));
        Assert.eq('get', v2, Attribute.get(c, k));
        KAssert.eqSome('getOpt', v2, Attribute.getOpt(c, k));
        Attribute.remove(c, k);
        Assert.eq('has', false, Attribute.has(c, k));
        Assert.eq('get', undefined, Attribute.get(c, k));
        KAssert.eqNone('getOpt', Attribute.getOpt(c, k));
    };
    // setting a non-simple value
    checkErr(Attribute.set, c, 'expect-console-error--value-undefined', undefined);
    checkErr(Attribute.set, c, 'expect-console-error--value-null', null);
    checkErr(Attribute.set, c, 'expect-console-error--value-object', {});
    // passing things that don't have attributes
    checkTypeErr(SugarElement.fromText(''));
    checkTypeErr(SugarElement.fromHtml('<!--a-->'));
    checkTypeErr(SugarElement.fromDom({}));
    check('name', 'black', 'blue');
    Assert.eq('hasNone', true, Attribute.hasNone(SugarElement.fromHtml('<div></div>')));
    Assert.eq('hasNone', true, Attribute.hasNone(SugarElement.fromHtml('<div>Dog</div>')));
    Assert.eq('hasNone', true, Attribute.hasNone(SugarElement.fromHtml('<div><span id="cat"></span></div>')));
    Assert.eq('hasNone', false, Attribute.hasNone(SugarElement.fromHtml('<div name="container"><span id="cat"></span></div>')));
    /*
     * Note: IE returns true for an empty style attribute.
     * Assert.eq(false, Attribute.hasNone(SugarElement.fromHtml<HTMLDivElement>('<div style=""><span id="cat"></span></div>')));
     *
     */
    Assert.eq('hasNone', false, Attribute.hasNone(SugarElement.fromHtml('<div style="display: block;"><span id="cat"></span></div>')));
    Assert.eq('clone', { id: 'cat' }, Attribute.clone(SugarElement.fromHtml('<span id="cat"></span>')));
    Assert.eq('clone', { 'name': 'foo', 'data-ephox-foo': 'bar' }, Attribute.clone(SugarElement.fromHtml('<span name="foo" data-ephox-foo="bar"></span>')));
    Attribute.set(c, 'tabindex', -1);
    Assert.eq('get', '-1', Attribute.get(c, 'tabindex'));
    Attribute.setOptions(c, {
        tabindex: Optional.none(),
        src: Optional.some('custom')
    });
    Assert.eq('setOptions - none', false, Attribute.has(c, 'tabindex'));
    Assert.eq('setOptions - some', 'custom', Attribute.get(c, 'src'));
});
//# sourceMappingURL=AttributeTest.js.map