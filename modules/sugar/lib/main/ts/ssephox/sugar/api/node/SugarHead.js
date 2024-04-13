"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHead = exports.head = void 0;
var SugarElement_1 = require("./SugarElement");
var head = function () { return (0, exports.getHead)(SugarElement_1.SugarElement.fromDom(document)); };
exports.head = head;
var getHead = function (doc) {
    /*
     * IE9 and above per
     * https://developer.mozilla.org/en-US/docs/Web/API/Document/head
     */
    var b = doc.dom.head;
    if (b === null || b === undefined) {
        throw new Error('Head is not available yet');
    }
    return SugarElement_1.SugarElement.fromDom(b);
};
exports.getHead = getHead;
//# sourceMappingURL=SugarHead.js.map