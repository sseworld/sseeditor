"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonAncestorContainer = exports.after = void 0;
var SugarElement_1 = require("../node/SugarElement");
var Traverse = require("../search/Traverse");
var Compare = require("./Compare");
var makeRange = function (start, soffset, finish, foffset) {
    var doc = Traverse.owner(start);
    // TODO: We need to think about a better place to put native range creation code. Does it even belong in sugar?
    // Could the `Compare` checks (node.compareDocumentPosition) handle these situations better?
    var rng = doc.dom.createRange();
    rng.setStart(start.dom, soffset);
    rng.setEnd(finish.dom, foffset);
    return rng;
};
// Return the deepest - or furthest down the document tree - Node that contains both boundary points
// of the range (start:soffset, finish:foffset).
var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return SugarElement_1.SugarElement.fromDom(r.commonAncestorContainer);
};
exports.commonAncestorContainer = commonAncestorContainer;
var after = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = Compare.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
};
exports.after = after;
//# sourceMappingURL=DocumentPosition.js.map