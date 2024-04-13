"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locate = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarText = require("../../api/node/SugarText");
var Geometry = require("../alien/Geometry");
var locateOffset = function (doc, textnode, x, y, rect) {
    var rangeForOffset = function (o) {
        var r = doc.dom.createRange();
        r.setStart(textnode.dom, o);
        r.collapse(true);
        return r;
    };
    var rectForOffset = function (o) {
        var r = rangeForOffset(o);
        return r.getBoundingClientRect();
    };
    var length = SugarText.get(textnode).length;
    var offset = Geometry.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
};
var locate = function (doc, node, x, y) {
    var r = doc.dom.createRange();
    r.selectNode(node.dom);
    var rects = r.getClientRects();
    var foundRect = katamari_1.Arr.findMap(rects, function (rect) {
        return Geometry.inRect(rect, x, y) ? katamari_1.Optional.some(rect) : katamari_1.Optional.none();
    });
    return foundRect.map(function (rect) { return locateOffset(doc, node, x, y, rect); });
};
exports.locate = locate;
//# sourceMappingURL=TextPoint.js.map