"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlInlineTagName = exports.htmlBlockTagName = void 0;
var fast_check_1 = require("fast-check");
var htmlBlockTagName = function () {
    // note: list is incomplete
    return fast_check_1.default.constantFrom('div', 'article', 'section', 'main', 'h1', 'h2', 'h3', 'aside', 'nav');
};
exports.htmlBlockTagName = htmlBlockTagName;
var htmlInlineTagName = function () {
    // note: list is incomplete
    return fast_check_1.default.constantFrom('span', 'b', 'i', 'u', 'strong', 'em');
};
exports.htmlInlineTagName = htmlInlineTagName;
//# sourceMappingURL=Arbitrary.js.map