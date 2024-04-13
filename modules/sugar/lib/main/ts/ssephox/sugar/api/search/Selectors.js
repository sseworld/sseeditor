"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.one = exports.is = exports.all = void 0;
var katamari_1 = require("@ssephox/katamari");
var NodeTypes_1 = require("../node/NodeTypes");
var SugarElement_1 = require("../node/SugarElement");
var is = function (element, selector) {
    var dom = element.dom;
    if (dom.nodeType !== NodeTypes_1.ELEMENT) {
        return false;
    }
    else {
        var elem = dom;
        if (elem.matches !== undefined) {
            return elem.matches(selector);
        }
        else if (elem.msMatchesSelector !== undefined) {
            return elem.msMatchesSelector(selector);
        }
        else if (elem.webkitMatchesSelector !== undefined) {
            return elem.webkitMatchesSelector(selector);
        }
        else if (elem.mozMatchesSelector !== undefined) {
            // cast to any as mozMatchesSelector doesn't exist in TS DOM lib
            return elem.mozMatchesSelector(selector);
        }
        else {
            throw new Error('Browser lacks native selectors');
        } // unfortunately we can't throw this on startup :(
    }
};
exports.is = is;
var bypassSelector = function (dom) {
    // Only elements, documents and shadow roots support querySelector
    // shadow root element type is DOCUMENT_FRAGMENT
    return dom.nodeType !== NodeTypes_1.ELEMENT && dom.nodeType !== NodeTypes_1.DOCUMENT && dom.nodeType !== NodeTypes_1.DOCUMENT_FRAGMENT ||
        // IE fix for complex queries on empty nodes: http://jsfiddle.net/spyder/fv9ptr5L/
        dom.childElementCount === 0;
};
var all = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom;
    return bypassSelector(base) ? [] : katamari_1.Arr.map(base.querySelectorAll(selector), SugarElement_1.SugarElement.fromDom);
};
exports.all = all;
var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom;
    return bypassSelector(base) ? katamari_1.Optional.none() : katamari_1.Optional.from(base.querySelector(selector)).map(SugarElement_1.SugarElement.fromDom);
};
exports.one = one;
//# sourceMappingURL=Selectors.js.map