"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.hasAny = exports.hasAll = exports.toggle = exports.remove = exports.add = void 0;
var katamari_1 = require("@ssephox/katamari");
var ClassList = require("../../impl/ClassList");
var Class = require("./Class");
/*
 * ClassList is IE10 minimum:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element.classList
 */
var add = function (element, classes) {
    katamari_1.Arr.each(classes, function (x) {
        Class.add(element, x);
    });
};
exports.add = add;
var remove = function (element, classes) {
    katamari_1.Arr.each(classes, function (x) {
        Class.remove(element, x);
    });
};
exports.remove = remove;
var toggle = function (element, classes) {
    katamari_1.Arr.each(classes, function (x) {
        Class.toggle(element, x);
    });
};
exports.toggle = toggle;
var hasAll = function (element, classes) {
    return katamari_1.Arr.forall(classes, function (clazz) { return Class.has(element, clazz); });
};
exports.hasAll = hasAll;
var hasAny = function (element, classes) {
    return katamari_1.Arr.exists(classes, function (clazz) { return Class.has(element, clazz); });
};
exports.hasAny = hasAny;
var getNative = function (element) {
    var classList = element.dom.classList;
    var r = new Array(classList.length);
    for (var i = 0; i < classList.length; i++) {
        var item = classList.item(i);
        if (item !== null) {
            r[i] = item;
        }
    }
    return r;
};
var get = function (element) {
    return ClassList.supports(element) ? getNative(element) : ClassList.get(element);
};
exports.get = get;
//# sourceMappingURL=Classes.js.map