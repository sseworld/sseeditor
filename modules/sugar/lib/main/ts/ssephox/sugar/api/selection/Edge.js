"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAtRightEdge = exports.isRight = exports.isAtLeftEdge = exports.isLeft = void 0;
var katamari_1 = require("@ssephox/katamari");
var Compare = require("../dom/Compare");
var Awareness = require("./Awareness");
var CursorPosition = require("./CursorPosition");
var isAtEdge = function (parent, current, currentOffset, descent, awareness) {
    return descent(parent).fold(katamari_1.Fun.always, function (element) { return Compare.eq(current, element) && awareness(current, currentOffset); });
};
var isLeft = function (parent, selection) {
    return isAtEdge(parent, selection.startContainer(), selection.startOffset(), CursorPosition.first, Awareness.isStart);
};
exports.isLeft = isLeft;
// This is doing exactly the same thing as the above isLeft method, checking to see if an element/offset selection endpoint is at the left edge of its parent
// after ascending up to that parent except we explicitly provide the element and its offset instead of just using the selection object.
var isAtLeftEdge = function (parent, element, offset) {
    return isAtEdge(parent, element, offset, CursorPosition.first, Awareness.isStart);
};
exports.isAtLeftEdge = isAtLeftEdge;
var isRight = function (parent, selection) {
    return isAtEdge(parent, selection.startContainer(), selection.startOffset(), CursorPosition.last, Awareness.isEnd);
};
exports.isRight = isRight;
// This is doing exactly the same thing as the above isRight method, checking to see if an element/offset selection endpoint is at the right edge of its parent
// after ascending up to that parent except we explicitly provide the element and its offset instead of just using the selection object.
var isAtRightEdge = function (parent, element, offset) {
    return isAtEdge(parent, element, offset, CursorPosition.last, Awareness.isEnd);
};
exports.isAtRightEdge = isAtRightEdge;
//# sourceMappingURL=Edge.js.map