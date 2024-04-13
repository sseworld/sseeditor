"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrap = exports.remove = exports.empty = void 0;
var katamari_1 = require("@ssephox/katamari");
var Traverse = require("../search/Traverse");
var InsertAll = require("./InsertAll");
var empty = function (element) {
    // shortcut "empty node" trick. Requires IE 9.
    element.dom.textContent = '';
    // If the contents was a single empty text node, the above doesn't remove it. But, it's still faster in general
    // than removing every child node manually.
    // The following is (probably) safe for performance as 99.9% of the time the trick works and
    // Traverse.children will return an empty array.
    katamari_1.Arr.each(Traverse.children(element), function (rogue) {
        remove(rogue);
    });
};
exports.empty = empty;
var remove = function (element) {
    var dom = element.dom;
    if (dom.parentNode !== null) {
        dom.parentNode.removeChild(dom);
    }
};
exports.remove = remove;
var unwrap = function (wrapper) {
    var children = Traverse.children(wrapper);
    if (children.length > 0) {
        InsertAll.after(wrapper, children);
    }
    remove(wrapper);
};
exports.unwrap = unwrap;
//# sourceMappingURL=Remove.js.map