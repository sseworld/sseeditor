"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromDom = exports.fromText = exports.fromTags = exports.fromHtml = void 0;
var katamari_1 = require("@ssephox/katamari");
var Traverse = require("../search/Traverse");
var SugarElement_1 = require("./SugarElement");
var fromHtml = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    return Traverse.children(SugarElement_1.SugarElement.fromDom(div));
};
exports.fromHtml = fromHtml;
var fromTags = function (tags, scope) {
    return katamari_1.Arr.map(tags, function (x) { return SugarElement_1.SugarElement.fromTag(x, scope); });
};
exports.fromTags = fromTags;
var fromText = function (texts, scope) {
    return katamari_1.Arr.map(texts, function (x) { return SugarElement_1.SugarElement.fromText(x, scope); });
};
exports.fromText = fromText;
var fromDom = function (nodes) {
    return katamari_1.Arr.map(nodes, SugarElement_1.SugarElement.fromDom);
};
exports.fromDom = fromDom;
//# sourceMappingURL=SugarElements.js.map