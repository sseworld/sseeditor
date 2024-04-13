"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locate = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarNode = require("../../api/node/SugarNode");
var Traverse = require("../../api/search/Traverse");
var Geometry = require("../alien/Geometry");
var TextPoint = require("./TextPoint");
/**
 * Future idea:
 *
 * This code requires the drop point to be contained within the nodes array somewhere. If it isn't,
 * we fall back to the extreme start or end of the node array contents.
 * This isn't really what the user intended.
 *
 * In theory, we could just find the range point closest to the boxes representing the node
 * (repartee does something similar).
 */
var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom.createRange();
    var nodes = Traverse.children(node);
    return katamari_1.Arr.findMap(nodes, function (n) {
        // slight mutation because we assume creating ranges is expensive
        r.selectNode(n.dom);
        return Geometry.inRect(r.getBoundingClientRect(), x, y) ?
            locateNode(doc, n, x, y) :
            katamari_1.Optional.none();
    });
};
var locateNode = function (doc, node, x, y) {
    return SugarNode.isText(node) ? TextPoint.locate(doc, node, x, y) : searchInChildren(doc, node, x, y);
};
var locate = function (doc, node, x, y) {
    var r = doc.dom.createRange();
    r.selectNode(node.dom);
    var rect = r.getBoundingClientRect();
    // Clamp x,y at the bounds of the node so that the locate function has SOME chance
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return locateNode(doc, node, boundedX, boundedY);
};
exports.locate = locate;
//# sourceMappingURL=ContainerPoint.js.map