"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTag = exports.isComment = exports.isDocumentFragment = exports.isDocument = exports.isText = exports.isHTMLElement = exports.isElement = exports.value = exports.type = exports.name = void 0;
var sand_1 = require("@ssephox/sand");
var NodeTypes = require("./NodeTypes");
var name = function (element) {
    var r = element.dom.nodeName;
    return r.toLowerCase();
};
exports.name = name;
var type = function (element) {
    return element.dom.nodeType;
};
exports.type = type;
var value = function (element) {
    return element.dom.nodeValue;
};
exports.value = value;
var isType = function (t) { return function (element) {
    return type(element) === t;
}; };
var isComment = function (element) {
    return type(element) === NodeTypes.COMMENT || name(element) === '#comment';
};
exports.isComment = isComment;
var isHTMLElement = function (element) {
    return isElement(element) && sand_1.SandHTMLElement.isPrototypeOf(element.dom);
};
exports.isHTMLElement = isHTMLElement;
var isElement = isType(NodeTypes.ELEMENT);
exports.isElement = isElement;
var isText = isType(NodeTypes.TEXT);
exports.isText = isText;
var isDocument = isType(NodeTypes.DOCUMENT);
exports.isDocument = isDocument;
var isDocumentFragment = isType(NodeTypes.DOCUMENT_FRAGMENT);
exports.isDocumentFragment = isDocumentFragment;
var isTag = function (tag) { return function (e) {
    return isElement(e) && name(e) === tag;
}; };
exports.isTag = isTag;
//# sourceMappingURL=SugarNode.js.map