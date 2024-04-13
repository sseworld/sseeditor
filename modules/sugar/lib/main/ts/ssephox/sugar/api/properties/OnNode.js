"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasClass = exports.removeClasses = exports.removeClass = exports.addClass = void 0;
var Class = require("./Class");
var Classes = require("./Classes");
var addClass = function (clazz) { return function (element) {
    Class.add(element, clazz);
}; };
exports.addClass = addClass;
var removeClass = function (clazz) { return function (element) {
    Class.remove(element, clazz);
}; };
exports.removeClass = removeClass;
var removeClasses = function (classes) { return function (element) {
    Classes.remove(element, classes);
}; };
exports.removeClasses = removeClasses;
var hasClass = function (clazz) { return function (element) {
    return Class.has(element, clazz);
}; };
exports.hasClass = hasClass;
//# sourceMappingURL=OnNode.js.map