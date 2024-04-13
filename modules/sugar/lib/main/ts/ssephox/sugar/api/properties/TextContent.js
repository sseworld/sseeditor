"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.get = void 0;
var get = function (element) {
    return element.dom.textContent;
};
exports.get = get;
var set = function (element, value) {
    element.dom.textContent = value;
};
exports.set = set;
//# sourceMappingURL=TextContent.js.map