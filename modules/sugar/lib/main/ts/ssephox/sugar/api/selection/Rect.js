"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
var toRaw = function (sr) { return ({
    left: sr.left(),
    top: sr.top(),
    right: sr.right(),
    bottom: sr.bottom(),
    width: sr.width(),
    height: sr.height()
}); };
exports.Rect = {
    toRaw: toRaw
};
//# sourceMappingURL=Rect.js.map