"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var Compare = require("ssephox/sugar/api/dom/Compare");
var Focus = require("ssephox/sugar/api/dom/Focus");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarElementInstances_1 = require("ssephox/sugar/api/node/SugarElementInstances");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var WithHelpers_1 = require("ssephox/sugar/test/WithHelpers");
var tOptional = katamari_1.OptionalInstances.tOptional;
bedrock_client_1.UnitTest.test('FocusTest', function () {
    var div = SugarElement_1.SugarElement.fromTag('div');
    Attribute.set(div, 'tabindex', '-1');
    var input = SugarElement_1.SugarElement.fromTag('input');
    Insert.append(div, input);
    Insert.append(SugarBody.body(), div);
    Focus.focus(input);
    bedrock_client_1.Assert.eq('', true, Compare.eq(Focus.active().getOrDie(), input));
    Focus.focus(div);
    bedrock_client_1.Assert.eq('', true, Compare.eq(Focus.active().getOrDie(), div));
    Focus.focus(input);
    bedrock_client_1.Assert.eq('', true, Compare.eq(Focus.active().getOrDie(), input));
    Focus.focusInside(div);
    bedrock_client_1.Assert.eq('', true, Compare.eq(Focus.active().getOrDie(), input));
    Focus.focusInside(input);
    bedrock_client_1.Assert.eq('', true, Compare.eq(Focus.active().getOrDie(), input));
    Focus.focus(div);
    bedrock_client_1.Assert.eq('', true, Compare.eq(Focus.active().getOrDie(), div));
    Remove.remove(div);
});
bedrock_client_1.UnitTest.test('Focus.active in ShadowRoot', function () {
    (0, WithHelpers_1.withShadowElement)(function (sr, id, sh) {
        var innerInput = SugarElement_1.SugarElement.fromTag('input');
        Insert.append(sr, innerInput);
        var outerInput = SugarElement_1.SugarElement.fromTag('input');
        Insert.append(SugarBody.body(), outerInput);
        Focus.focus(innerInput);
        bedrock_client_1.Assert.eq('ShadowRoot\'s active element is the inner input box', Focus.active(sr), katamari_1.Optional.some(innerInput), tOptional((0, SugarElementInstances_1.tElement)()));
        bedrock_client_1.Assert.eq('Document\'s active element is the shadow host', Focus.active(), katamari_1.Optional.some(sh), tOptional((0, SugarElementInstances_1.tElement)()));
        Focus.focus(outerInput);
        bedrock_client_1.Assert.eq('ShadowRoot\'s active element should be none', Focus.active(sr), katamari_1.Optional.none(), tOptional((0, SugarElementInstances_1.tElement)()));
        bedrock_client_1.Assert.eq('Document\'s active element is the outer input box', Focus.active(), katamari_1.Optional.some(outerInput), tOptional((0, SugarElementInstances_1.tElement)()));
        Remove.remove(outerInput);
    });
});
bedrock_client_1.UnitTest.test('Focus.search in ShadowRoot', function () {
    (0, WithHelpers_1.withShadowElement)(function (sr, id, sh) {
        var innerInput = SugarElement_1.SugarElement.fromTag('input');
        Insert.append(id, innerInput);
        var outerInput = SugarElement_1.SugarElement.fromTag('input');
        Insert.append(SugarBody.body(), outerInput);
        Focus.focus(innerInput);
        bedrock_client_1.Assert.eq('Searching from div inside shadow root should yield focused input box', Focus.search(id), katamari_1.Optional.some(innerInput), tOptional((0, SugarElementInstances_1.tElement)()));
        bedrock_client_1.Assert.eq('Searching from shadow root should yield focused input box', Focus.search(sr), katamari_1.Optional.some(innerInput), tOptional((0, SugarElementInstances_1.tElement)()));
        bedrock_client_1.Assert.eq('Searching from shadow host should yield shadow host', Focus.search(sh), katamari_1.Optional.some(sh), tOptional((0, SugarElementInstances_1.tElement)()));
        bedrock_client_1.Assert.eq('Searching from body should yield shadow host', Focus.search(SugarBody.body()), katamari_1.Optional.some(sh), tOptional((0, SugarElementInstances_1.tElement)()));
        Focus.focus(outerInput);
        bedrock_client_1.Assert.eq('Searching from div inside shadow root should yield none', Focus.search(id), katamari_1.Optional.none(), tOptional((0, SugarElementInstances_1.tElement)()));
        bedrock_client_1.Assert.eq('Searching from shadow root should yield none', Focus.search(sr), katamari_1.Optional.none(), tOptional((0, SugarElementInstances_1.tElement)()));
        bedrock_client_1.Assert.eq('Searching from shadow host should yield none', Focus.search(sh), katamari_1.Optional.none(), tOptional((0, SugarElementInstances_1.tElement)()));
        bedrock_client_1.Assert.eq('Searching from body should yield outer input box', Focus.search(SugarBody.body()), katamari_1.Optional.some(outerInput), tOptional((0, SugarElementInstances_1.tElement)()));
        Remove.remove(outerInput);
    });
});
bedrock_client_1.UnitTest.test('Focus.hasFocus in ShadowRoot', function () {
    (0, WithHelpers_1.withShadowElement)(function (shadowRoot, innerDiv, shadowHost) {
        var innerInput = SugarElement_1.SugarElement.fromTag('input');
        Insert.append(innerDiv, innerInput);
        var outerInput = SugarElement_1.SugarElement.fromTag('input');
        Insert.append(SugarBody.body(), outerInput);
        Focus.focus(innerInput);
        bedrock_client_1.Assert.eq('innerInput should have focus', true, Focus.hasFocus(innerInput));
        bedrock_client_1.Assert.eq('shadowHost should have focus', true, Focus.hasFocus(shadowHost));
        bedrock_client_1.Assert.eq('innerDiv should not have focus', false, Focus.hasFocus(innerDiv));
        bedrock_client_1.Assert.eq('outerInput should not have focus', false, Focus.hasFocus(outerInput));
        bedrock_client_1.Assert.eq('shadowRoot should not have focus', false, Focus.hasFocus(shadowRoot));
        Focus.focus(outerInput);
        bedrock_client_1.Assert.eq('innerInput should not have focus', false, Focus.hasFocus(innerInput));
        bedrock_client_1.Assert.eq('shadowHost should not have focus', false, Focus.hasFocus(shadowHost));
        bedrock_client_1.Assert.eq('innerDiv should not have focus', false, Focus.hasFocus(innerDiv));
        bedrock_client_1.Assert.eq('outerInput should have focus', true, Focus.hasFocus(outerInput));
        bedrock_client_1.Assert.eq('shadowRoot should not have focus', false, Focus.hasFocus(shadowRoot));
        Remove.remove(outerInput);
    });
});
bedrock_client_1.UnitTest.test('Focus.focusInside in ShadowRoot', function () {
    (0, WithHelpers_1.withShadowElement)(function (shadowRoot, innerDiv, shadowHost) {
        var innerInput = SugarElement_1.SugarElement.fromTag('input');
        Insert.append(innerDiv, innerInput);
        Attribute.set(innerDiv, 'tabindex', '-1');
        Focus.focus(innerInput);
        bedrock_client_1.Assert.eq('innerInput should have focus', true, Focus.hasFocus(innerInput));
        bedrock_client_1.Assert.eq('innerDiv should not have focus', false, Focus.hasFocus(innerDiv));
        bedrock_client_1.Assert.eq('shadowHost should have focus', true, Focus.hasFocus(shadowHost));
        Focus.focusInside(innerDiv);
        bedrock_client_1.Assert.eq('innerInput should have focus', true, Focus.hasFocus(innerInput));
        bedrock_client_1.Assert.eq('innerDiv should not have focus', false, Focus.hasFocus(innerDiv));
        bedrock_client_1.Assert.eq('shadowHost should have focus', true, Focus.hasFocus(shadowHost));
        Focus.focus(innerDiv);
        bedrock_client_1.Assert.eq('innerInput should not have focus', false, Focus.hasFocus(innerInput));
        bedrock_client_1.Assert.eq('innerDiv should have focus', true, Focus.hasFocus(innerDiv));
        bedrock_client_1.Assert.eq('shadowHost should have focus', true, Focus.hasFocus(shadowHost));
    });
});
//# sourceMappingURL=FocusTest.js.map