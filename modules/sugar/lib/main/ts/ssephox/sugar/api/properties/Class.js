"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.has = exports.toggler = exports.toggle = exports.remove = exports.add = void 0;
var ClassList = require("../../impl/ClassList");
var Attribute = require("./Attribute");
var Toggler_1 = require("./Toggler");
/*
 * ClassList is IE10 minimum:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element.classList
 *
 * Note that IE doesn't support the second argument to toggle (at all).
 * If it did, the toggler could be better.
 */
var add = function (element, clazz) {
    if (ClassList.supports(element)) {
        element.dom.classList.add(clazz);
    }
    else {
        ClassList.add(element, clazz);
    }
};
exports.add = add;
var cleanClass = function (element) {
    var classList = ClassList.supports(element) ? element.dom.classList : ClassList.get(element);
    // classList is a "live list", so this is up to date already
    if (classList.length === 0) {
        // No more classes left, remove the class attribute as well
        Attribute.remove(element, 'class');
    }
};
var remove = function (element, clazz) {
    if (ClassList.supports(element)) {
        var classList = element.dom.classList;
        classList.remove(clazz);
    }
    else {
        ClassList.remove(element, clazz);
    }
    cleanClass(element);
};
exports.remove = remove;
var toggle = function (element, clazz) {
    var result = ClassList.supports(element) ? element.dom.classList.toggle(clazz) : ClassList.toggle(element, clazz);
    cleanClass(element);
    return result;
};
exports.toggle = toggle;
var toggler = function (element, clazz) {
    var hasClasslist = ClassList.supports(element);
    var classList = element.dom.classList;
    var off = function () {
        if (hasClasslist) {
            classList.remove(clazz);
        }
        else {
            ClassList.remove(element, clazz);
        }
        cleanClass(element);
    };
    var on = function () {
        if (hasClasslist) {
            classList.add(clazz);
        }
        else {
            ClassList.add(element, clazz);
        }
    };
    return (0, Toggler_1.Toggler)(off, on, has(element, clazz));
};
exports.toggler = toggler;
var has = function (element, clazz) {
    return ClassList.supports(element) && element.dom.classList.contains(clazz);
};
exports.has = has;
//# sourceMappingURL=Class.js.map