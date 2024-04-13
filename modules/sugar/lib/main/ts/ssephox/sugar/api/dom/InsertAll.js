"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.append = exports.prepend = exports.after = exports.before = void 0;
var katamari_1 = require("@ssephox/katamari");
var Insert = require("./Insert");
var before = function (marker, elements) {
    katamari_1.Arr.each(elements, function (x) {
        Insert.before(marker, x);
    });
};
exports.before = before;
var after = function (marker, elements) {
    katamari_1.Arr.each(elements, function (x, i) {
        var e = i === 0 ? marker : elements[i - 1];
        Insert.after(e, x);
    });
};
exports.after = after;
var prepend = function (parent, elements) {
    katamari_1.Arr.each(elements.slice().reverse(), function (x) {
        Insert.prepend(parent, x);
    });
};
exports.prepend = prepend;
var append = function (parent, elements) {
    katamari_1.Arr.each(elements, function (x) {
        Insert.append(parent, x);
    });
};
exports.append = append;
//# sourceMappingURL=InsertAll.js.map