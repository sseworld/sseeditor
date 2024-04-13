"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("./SugarElement");
var getNodes = function (texas) {
    var ret = [];
    while (texas.nextNode() !== null) {
        ret.push(SugarElement_1.SugarElement.fromDom(texas.currentNode));
    }
    return ret;
};
var find = function (node, filterOpt) {
    var predicate = filterOpt.getOr(katamari_1.Fun.always);
    var texas = document.createTreeWalker(node.dom, NodeFilter.SHOW_COMMENT, {
        acceptNode: function (comment) { return predicate(comment.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }
    });
    return getNodes(texas);
};
exports.find = find;
//# sourceMappingURL=SugarComments.js.map