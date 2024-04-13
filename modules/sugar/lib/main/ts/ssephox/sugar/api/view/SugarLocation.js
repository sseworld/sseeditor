"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewport = exports.relative = exports.absolute = void 0;
var SugarBody_1 = require("../node/SugarBody");
var SugarPosition_1 = require("./SugarPosition");
var boxPosition = function (dom) {
    var box = dom.getBoundingClientRect();
    return (0, SugarPosition_1.SugarPosition)(box.left, box.top);
};
// Avoids falsy false fallthrough
var firstDefinedOrZero = function (a, b) {
    if (a !== undefined) {
        return a;
    }
    else {
        return b !== undefined ? b : 0;
    }
};
var absolute = function (element) {
    var doc = element.dom.ownerDocument;
    var body = doc.body;
    var win = doc.defaultView;
    var html = doc.documentElement;
    if (body === element.dom) {
        return (0, SugarPosition_1.SugarPosition)(body.offsetLeft, body.offsetTop);
    }
    var scrollTop = firstDefinedOrZero(win === null || win === void 0 ? void 0 : win.pageYOffset, html.scrollTop);
    var scrollLeft = firstDefinedOrZero(win === null || win === void 0 ? void 0 : win.pageXOffset, html.scrollLeft);
    var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
    var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
    return viewport(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
};
exports.absolute = absolute;
// This is the old $.position(), but JQuery does nonsense calculations.
// We're only 1 <-> 1 with the old value in the single place we use this function
// (ego.api.Dragging) so the rest can bite me.
var relative = function (element) {
    var dom = element.dom;
    // jquery-ism: when style="position: fixed", this === boxPosition()
    // but tests reveal it returns the same thing anyway
    return (0, SugarPosition_1.SugarPosition)(dom.offsetLeft, dom.offsetTop);
};
exports.relative = relative;
var viewport = function (element) {
    var dom = element.dom;
    var doc = dom.ownerDocument;
    var body = doc.body;
    if (body === dom) {
        return (0, SugarPosition_1.SugarPosition)(body.offsetLeft, body.offsetTop);
    }
    if (!(0, SugarBody_1.inBody)(element)) {
        return (0, SugarPosition_1.SugarPosition)(0, 0);
    }
    return boxPosition(dom);
};
exports.viewport = viewport;
//# sourceMappingURL=SugarLocation.js.map