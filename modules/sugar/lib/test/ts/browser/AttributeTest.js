"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var katamari_assertions_1 = require("@ssephox/katamari-assertions");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var Div_1 = require("ssephox/sugar/test/Div");
bedrock_client_1.UnitTest.test('AttributeTest', function () {
    var c = (0, Div_1.default)();
    var checkErr = function (f, element, k, v) {
        try {
            f(element, k, v);
        }
        catch (e) {
            // expected
            return;
        }
        bedrock_client_1.Assert.fail('function did not throw an error');
    };
    var checkTypeErr = function (e) {
        checkErr(Attribute.get, e, 'id');
        checkErr(Attribute.set, e, 'id', '');
        checkErr(Attribute.setAll, e, { id: '' });
        checkErr(Attribute.remove, e, 'id');
        // has just returns false now, no point in errors
        bedrock_client_1.Assert.eq('does not have key', false, Attribute.has(e, 'id'));
    };
    var check = function (k, v1, v2) {
        bedrock_client_1.Assert.eq('has', false, Attribute.has(c, k));
        bedrock_client_1.Assert.eq('get', undefined, Attribute.get(c, k));
        katamari_assertions_1.KAssert.eqNone('getOpt', Attribute.getOpt(c, k));
        Attribute.set(c, k, v1);
        bedrock_client_1.Assert.eq('has', true, Attribute.has(c, k));
        bedrock_client_1.Assert.eq('get', v1, Attribute.get(c, k));
        katamari_assertions_1.KAssert.eqSome('getOpt', v1, Attribute.getOpt(c, k));
        Attribute.set(c, k, v2);
        bedrock_client_1.Assert.eq('has', true, Attribute.has(c, k));
        bedrock_client_1.Assert.eq('get', v2, Attribute.get(c, k));
        katamari_assertions_1.KAssert.eqSome('getOpt', v2, Attribute.getOpt(c, k));
        Attribute.remove(c, k);
        bedrock_client_1.Assert.eq('has', false, Attribute.has(c, k));
        bedrock_client_1.Assert.eq('get', undefined, Attribute.get(c, k));
        katamari_assertions_1.KAssert.eqNone('getOpt', Attribute.getOpt(c, k));
    };
    // setting a non-simple value
    checkErr(Attribute.set, c, 'expect-console-error--value-undefined', undefined);
    checkErr(Attribute.set, c, 'expect-console-error--value-null', null);
    checkErr(Attribute.set, c, 'expect-console-error--value-object', {});
    // passing things that don't have attributes
    checkTypeErr(SugarElement_1.SugarElement.fromText(''));
    checkTypeErr(SugarElement_1.SugarElement.fromHtml('<!--a-->'));
    checkTypeErr(SugarElement_1.SugarElement.fromDom({}));
    check('name', 'black', 'blue');
    bedrock_client_1.Assert.eq('hasNone', true, Attribute.hasNone(SugarElement_1.SugarElement.fromHtml('<div></div>')));
    bedrock_client_1.Assert.eq('hasNone', true, Attribute.hasNone(SugarElement_1.SugarElement.fromHtml('<div>Dog</div>')));
    bedrock_client_1.Assert.eq('hasNone', true, Attribute.hasNone(SugarElement_1.SugarElement.fromHtml('<div><span id="cat"></span></div>')));
    bedrock_client_1.Assert.eq('hasNone', false, Attribute.hasNone(SugarElement_1.SugarElement.fromHtml('<div name="container"><span id="cat"></span></div>')));
    /*
     * Note: IE returns true for an empty style attribute.
     * Assert.eq(false, Attribute.hasNone(SugarElement.fromHtml<HTMLDivElement>('<div style=""><span id="cat"></span></div>')));
     *
     */
    bedrock_client_1.Assert.eq('hasNone', false, Attribute.hasNone(SugarElement_1.SugarElement.fromHtml('<div style="display: block;"><span id="cat"></span></div>')));
    bedrock_client_1.Assert.eq('clone', { id: 'cat' }, Attribute.clone(SugarElement_1.SugarElement.fromHtml('<span id="cat"></span>')));
    bedrock_client_1.Assert.eq('clone', { 'name': 'foo', 'data-ephox-foo': 'bar' }, Attribute.clone(SugarElement_1.SugarElement.fromHtml('<span name="foo" data-ephox-foo="bar"></span>')));
    Attribute.set(c, 'tabindex', -1);
    bedrock_client_1.Assert.eq('get', '-1', Attribute.get(c, 'tabindex'));
    Attribute.setOptions(c, {
        tabindex: katamari_1.Optional.none(),
        src: katamari_1.Optional.some('custom')
    });
    bedrock_client_1.Assert.eq('setOptions - none', false, Attribute.has(c, 'tabindex'));
    bedrock_client_1.Assert.eq('setOptions - some', 'custom', Attribute.get(c, 'src'));
});
//# sourceMappingURL=AttributeTest.js.map