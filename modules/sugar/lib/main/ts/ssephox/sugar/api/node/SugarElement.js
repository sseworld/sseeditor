"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SugarElement = void 0;
var katamari_1 = require("@ssephox/katamari");
var fromHtml = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    if (!div.hasChildNodes() || div.childNodes.length > 1) {
        var message = 'HTML does not have a single root node';
        // eslint-disable-next-line no-console
        console.error(message, html);
        throw new Error(message);
    }
    return fromDom(div.childNodes[0]);
};
var fromTag = function (tag, scope) {
    var doc = scope || document;
    var node = doc.createElement(tag);
    return fromDom(node);
};
var fromText = function (text, scope) {
    var doc = scope || document;
    var node = doc.createTextNode(text);
    return fromDom(node);
};
var fromDom = function (node) {
    // TODO: Consider removing this check, but left atm for safety
    if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
    }
    return {
        dom: node
    };
};
var fromPoint = function (docElm, x, y) {
    return katamari_1.Optional.from(docElm.dom.elementFromPoint(x, y)).map(fromDom);
};
// tslint:disable-next-line:variable-name
var SugarElement = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
};
exports.SugarElement = SugarElement;
//# sourceMappingURL=SugarElement.js.map