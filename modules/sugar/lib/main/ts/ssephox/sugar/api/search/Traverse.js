"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaf = exports.hasChildNodes = exports.childNodesCount = exports.lastChild = exports.firstChild = exports.child = exports.children = exports.nextSiblings = exports.nextSibling = exports.prevSiblings = exports.offsetParent = exports.prevSibling = exports.siblings = exports.parents = exports.findIndex = exports.parentElement = exports.parentNode = exports.parent = exports.documentElement = exports.defaultView = exports.documentOrOwner = exports.owner = void 0;
var katamari_1 = require("@ssephox/katamari");
var Recurse = require("../../alien/Recurse");
var Compare = require("../dom/Compare");
var SugarElement_1 = require("../node/SugarElement");
var SugarNode = require("../node/SugarNode");
/**
 * The document associated with the current element
 * NOTE: this will throw if the owner is null.
 */
var owner = function (element) {
    return SugarElement_1.SugarElement.fromDom(element.dom.ownerDocument);
};
exports.owner = owner;
/**
 * If the element is a document, return it. Otherwise, return its ownerDocument.
 * @param dos
 */
var documentOrOwner = function (dos) {
    return SugarNode.isDocument(dos) ? dos : owner(dos);
};
exports.documentOrOwner = documentOrOwner;
var documentElement = function (element) {
    return SugarElement_1.SugarElement.fromDom(documentOrOwner(element).dom.documentElement);
};
exports.documentElement = documentElement;
/**
 * The window element associated with the element
 * NOTE: this will throw if the defaultView is null.
 */
var defaultView = function (element) {
    return SugarElement_1.SugarElement.fromDom(documentOrOwner(element).dom.defaultView);
};
exports.defaultView = defaultView;
var parent = function (element) {
    return katamari_1.Optional.from(element.dom.parentNode).map(SugarElement_1.SugarElement.fromDom);
};
exports.parent = parent;
// Cast down to just be SugarElement<Node>
var parentNode = function (element) {
    return parent(element);
};
exports.parentNode = parentNode;
var parentElement = function (element) {
    return katamari_1.Optional.from(element.dom.parentElement).map(SugarElement_1.SugarElement.fromDom);
};
exports.parentElement = parentElement;
var findIndex = function (element) {
    return parent(element).bind(function (p) {
        // TODO: Refactor out children so we can avoid the constant unwrapping
        var kin = children(p);
        return katamari_1.Arr.findIndex(kin, function (elem) { return Compare.eq(element, elem); });
    });
};
exports.findIndex = findIndex;
var parents = function (element, isRoot) {
    var stop = katamari_1.Type.isFunction(isRoot) ? isRoot : katamari_1.Fun.never;
    // This is used a *lot* so it needs to be performant, not recursive
    var dom = element.dom;
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
        var rawParent = dom.parentNode;
        var p = SugarElement_1.SugarElement.fromDom(rawParent);
        ret.push(p);
        if (stop(p) === true) {
            break;
        }
        else {
            dom = rawParent;
        }
    }
    return ret;
};
exports.parents = parents;
var siblings = function (element) {
    // TODO: Refactor out children so we can just not add self instead of filtering afterwards
    var filterSelf = function (elements) { return katamari_1.Arr.filter(elements, function (x) { return !Compare.eq(element, x); }); };
    return parent(element).map(children).map(filterSelf).getOr([]);
};
exports.siblings = siblings;
var offsetParent = function (element) {
    return katamari_1.Optional.from(element.dom.offsetParent).map(SugarElement_1.SugarElement.fromDom);
};
exports.offsetParent = offsetParent;
var prevSibling = function (element) {
    return katamari_1.Optional.from(element.dom.previousSibling).map(SugarElement_1.SugarElement.fromDom);
};
exports.prevSibling = prevSibling;
var nextSibling = function (element) {
    return katamari_1.Optional.from(element.dom.nextSibling).map(SugarElement_1.SugarElement.fromDom);
};
exports.nextSibling = nextSibling;
// This one needs to be reversed, so they're still in DOM order
var prevSiblings = function (element) {
    return katamari_1.Arr.reverse(Recurse.toArray(element, prevSibling));
};
exports.prevSiblings = prevSiblings;
var nextSiblings = function (element) {
    return Recurse.toArray(element, nextSibling);
};
exports.nextSiblings = nextSiblings;
var children = function (element) {
    return katamari_1.Arr.map(element.dom.childNodes, SugarElement_1.SugarElement.fromDom);
};
exports.children = children;
var child = function (element, index) {
    var cs = element.dom.childNodes;
    return katamari_1.Optional.from(cs[index]).map(SugarElement_1.SugarElement.fromDom);
};
exports.child = child;
var firstChild = function (element) {
    return child(element, 0);
};
exports.firstChild = firstChild;
var lastChild = function (element) {
    return child(element, element.dom.childNodes.length - 1);
};
exports.lastChild = lastChild;
var childNodesCount = function (element) {
    return element.dom.childNodes.length;
};
exports.childNodesCount = childNodesCount;
var hasChildNodes = function (element) {
    return element.dom.hasChildNodes();
};
exports.hasChildNodes = hasChildNodes;
var spot = function (element, offset) { return ({
    element: element,
    offset: offset
}); };
var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
};
exports.leaf = leaf;
//# sourceMappingURL=Traverse.js.map