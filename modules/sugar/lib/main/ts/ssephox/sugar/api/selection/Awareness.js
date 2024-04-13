"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCursorPosition = exports.isStart = exports.isEnd = exports.getEnd = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarNode = require("../node/SugarNode");
var SugarText = require("../node/SugarText");
var Attribute = require("../properties/Attribute");
var Traverse = require("../search/Traverse");
var getEnd = function (element) {
    return SugarNode.name(element) === 'img' ? 1 : SugarText.getOption(element).fold(function () { return Traverse.children(element).length; }, function (v) { return v.length; });
};
exports.getEnd = getEnd;
var isEnd = function (element, offset) { return getEnd(element) === offset; };
exports.isEnd = isEnd;
var isStart = function (element, offset) { return offset === 0; };
exports.isStart = isStart;
var isTextNodeWithCursorPosition = function (el) { return SugarText.getOption(el).filter(function (text) {
    // For the purposes of finding cursor positions only allow text nodes with content,
    // but trim removes &nbsp; and that's allowed
    return text.trim().length !== 0 || text.indexOf(katamari_1.Unicode.nbsp) > -1;
}).isSome(); };
var isContentEditableFalse = function (elem) { return SugarNode.isHTMLElement(elem) && (Attribute.get(elem, 'contenteditable') === 'false'); };
var elementsWithCursorPosition = ['img', 'br'];
var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || katamari_1.Arr.contains(elementsWithCursorPosition, SugarNode.name(elem)) || isContentEditableFalse(elem);
};
exports.isCursorPosition = isCursorPosition;
//# sourceMappingURL=Awareness.js.map