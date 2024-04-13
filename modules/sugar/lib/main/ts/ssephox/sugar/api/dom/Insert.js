"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = exports.appendAt = exports.append = exports.prepend = exports.after = exports.before = void 0;
var Traverse = require("../search/Traverse");
var before = function (marker, element) {
    var parent = Traverse.parent(marker);
    parent.each(function (v) {
        v.dom.insertBefore(element.dom, marker.dom);
    });
};
exports.before = before;
var after = function (marker, element) {
    var sibling = Traverse.nextSibling(marker);
    sibling.fold(function () {
        var parent = Traverse.parent(marker);
        parent.each(function (v) {
            append(v, element);
        });
    }, function (v) {
        before(v, element);
    });
};
exports.after = after;
var prepend = function (parent, element) {
    var firstChild = Traverse.firstChild(parent);
    firstChild.fold(function () {
        append(parent, element);
    }, function (v) {
        parent.dom.insertBefore(element.dom, v.dom);
    });
};
exports.prepend = prepend;
var append = function (parent, element) {
    parent.dom.appendChild(element.dom);
};
exports.append = append;
var appendAt = function (parent, element, index) {
    Traverse.child(parent, index).fold(function () {
        append(parent, element);
    }, function (v) {
        before(v, element);
    });
};
exports.appendAt = appendAt;
var wrap = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
};
exports.wrap = wrap;
//# sourceMappingURL=Insert.js.map