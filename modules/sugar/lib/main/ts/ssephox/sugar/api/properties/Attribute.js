"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = exports.hasNone = exports.remove = exports.has = exports.getOpt = exports.get = exports.setOptions = exports.setAll = exports.set = exports.clone = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarNode = require("../node/SugarNode");
var rawSet = function (dom, key, value) {
    /*
     * JQuery coerced everything to a string, and silently did nothing on text node/null/undefined.
     *
     * We fail on those invalid cases, only allowing numbers and booleans.
     */
    if (katamari_1.Type.isString(value) || katamari_1.Type.isBoolean(value) || katamari_1.Type.isNumber(value)) {
        dom.setAttribute(key, value + '');
    }
    else {
        // eslint-disable-next-line no-console
        console.error('Invalid call to Attribute.set. Key ', key, ':: Value ', value, ':: Element ', dom);
        throw new Error('Attribute value was not simple');
    }
};
var set = function (element, key, value) {
    rawSet(element.dom, key, value);
};
exports.set = set;
var setAll = function (element, attrs) {
    var dom = element.dom;
    katamari_1.Obj.each(attrs, function (v, k) {
        rawSet(dom, k, v);
    });
};
exports.setAll = setAll;
var setOptions = function (element, attrs) {
    katamari_1.Obj.each(attrs, function (v, k) {
        v.fold(function () {
            remove(element, k);
        }, function (value) {
            rawSet(element.dom, k, value);
        });
    });
};
exports.setOptions = setOptions;
var get = function (element, key) {
    var v = element.dom.getAttribute(key);
    // undefined is the more appropriate value for JS, and this matches JQuery
    return v === null ? undefined : v;
};
exports.get = get;
var getOpt = function (element, key) {
    return katamari_1.Optional.from(get(element, key));
};
exports.getOpt = getOpt;
var has = function (element, key) {
    var dom = element.dom;
    // return false for non-element nodes, no point in throwing an error
    return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
};
exports.has = has;
var remove = function (element, key) {
    element.dom.removeAttribute(key);
};
exports.remove = remove;
var hasNone = function (element) {
    var attrs = element.dom.attributes;
    return attrs === undefined || attrs === null || attrs.length === 0;
};
exports.hasNone = hasNone;
var clone = function (element) {
    return katamari_1.Arr.foldl(element.dom.attributes, function (acc, attr) {
        acc[attr.name] = attr.value;
        return acc;
    }, {});
};
exports.clone = clone;
var transferOne = function (source, destination, attr) {
    // NOTE: We don't want to clobber any existing attributes
    if (!has(destination, attr)) {
        getOpt(source, attr).each(function (srcValue) { return set(destination, attr, srcValue); });
    }
};
// Transfer attributes(attrs) from source to destination, unless they are already present
var transfer = function (source, destination, attrs) {
    if (!SugarNode.isElement(source) || !SugarNode.isElement(destination)) {
        return;
    }
    katamari_1.Arr.each(attrs, function (attr) {
        transferOne(source, destination, attr);
    });
};
exports.transfer = transfer;
//# sourceMappingURL=Attribute.js.map