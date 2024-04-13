"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SugarPosition = void 0;
var r = function (left, top) {
    var translate = function (x, y) { return r(left + x, top + y); };
    return {
        left: left,
        top: top,
        translate: translate
    };
};
// tslint:disable-next-line:variable-name
exports.SugarPosition = r;
//# sourceMappingURL=SugarPosition.js.map