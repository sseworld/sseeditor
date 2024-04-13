"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inBody = exports.getBody = exports.body = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("./SugarElement");
var SugarNode = require("./SugarNode");
var SugarShadowDom_1 = require("./SugarShadowDom");
// Node.contains() is very, very, very good performance
// http://jsperf.com/closest-vs-contains/5
var inBody = function (element) {
    // Technically this is only required on IE, where contains() returns false for text nodes.
    // But it's cheap enough to run everywhere and Sugar doesn't have platform detection (yet).
    var dom = SugarNode.isText(element) ? element.dom.parentNode : element.dom;
    // use ownerDocument.body to ensure this works inside iframes.
    // Normally contains is bad because an element "contains" itself, but here we want that.
    if (dom === undefined || dom === null || dom.ownerDocument === null) {
        return false;
    }
    var doc = dom.ownerDocument;
    return (0, SugarShadowDom_1.getShadowRoot)(SugarElement_1.SugarElement.fromDom(dom)).fold(function () { return doc.body.contains(dom); }, katamari_1.Fun.compose1(inBody, SugarShadowDom_1.getShadowHost));
};
exports.inBody = inBody;
var body = function () {
    return getBody(SugarElement_1.SugarElement.fromDom(document));
};
exports.body = body;
var getBody = function (doc) {
    var b = doc.dom.body;
    if (b === null || b === undefined) {
        throw new Error('Body is not available yet');
    }
    return SugarElement_1.SugarElement.fromDom(b);
};
exports.getBody = getBody;
//# sourceMappingURL=SugarBody.js.map