"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withIframe = exports.withShadowElement = exports.withShadowElementInMode = exports.setupShadowRoot = exports.withNormalElement = void 0;
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarShadowDom = require("ssephox/sugar/api/node/SugarShadowDom");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var withNormalElement = function (f) {
    var div = SugarElement_1.SugarElement.fromTag('div');
    Insert.append(SugarBody.body(), div);
    f(div);
    Remove.remove(div);
};
exports.withNormalElement = withNormalElement;
var setupShadowRoot = function (mode) {
    var shadowHost = SugarElement_1.SugarElement.fromTag('div', document);
    Attribute.set(shadowHost, 'data-description', 'shadowHost');
    Insert.append(SugarBody.body(), shadowHost);
    var shadowRoot = SugarElement_1.SugarElement.fromDom(shadowHost.dom.attachShadow({ mode: mode }));
    var innerDiv = SugarElement_1.SugarElement.fromTag('div', document);
    Attribute.set(innerDiv, 'data-description', 'innerDiv');
    Insert.append(shadowRoot, innerDiv);
    return { shadowHost: shadowHost, innerDiv: innerDiv, shadowRoot: shadowRoot };
};
exports.setupShadowRoot = setupShadowRoot;
var withShadowElementInMode = function (mode, f) {
    if (SugarShadowDom.isSupported()) {
        var _a = (0, exports.setupShadowRoot)(mode), shadowRoot = _a.shadowRoot, innerDiv = _a.innerDiv, shadowHost = _a.shadowHost;
        f(shadowRoot, innerDiv, shadowHost);
        Remove.remove(shadowHost);
    }
};
exports.withShadowElementInMode = withShadowElementInMode;
var withShadowElement = function (f) {
    (0, exports.withShadowElementInMode)('open', f);
    (0, exports.withShadowElementInMode)('closed', f);
};
exports.withShadowElement = withShadowElement;
var withIframe = function (f) {
    var iframe = SugarElement_1.SugarElement.fromTag('iframe');
    Insert.append(SugarBody.body(), iframe);
    var cw = iframe.dom.contentWindow;
    if (cw === null) {
        throw new Error('contentWindow was null');
    }
    cw.document.open();
    cw.document.write('<html><head></head><body></body><html></html>');
    var div = SugarElement_1.SugarElement.fromTag('div', cw.document);
    Insert.append(SugarBody.getBody(SugarElement_1.SugarElement.fromDom(cw.document)), div);
    cw.document.close();
    f(div, iframe, cw);
    Remove.remove(iframe);
};
exports.withIframe = withIframe;
//# sourceMappingURL=WithHelpers.js.map