"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromPoint = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("../../api/node/SugarElement");
var SimRange_1 = require("../../api/selection/SimRange");
var caretPositionFromPoint = function (doc, x, y) {
    var _a, _b;
    return katamari_1.Optional.from((_b = (_a = doc.dom).caretPositionFromPoint) === null || _b === void 0 ? void 0 : _b.call(_a, x, y))
        .bind(function (pos) {
        // It turns out that Firefox can return null for pos.offsetNode
        if (pos.offsetNode === null) {
            return katamari_1.Optional.none();
        }
        var r = doc.dom.createRange();
        r.setStart(pos.offsetNode, pos.offset);
        r.collapse();
        return katamari_1.Optional.some(r);
    });
};
var caretRangeFromPoint = function (doc, x, y) { var _a, _b; return katamari_1.Optional.from((_b = (_a = doc.dom).caretRangeFromPoint) === null || _b === void 0 ? void 0 : _b.call(_a, x, y)); };
var availableSearch = (function () {
    if (document.caretPositionFromPoint) {
        return caretPositionFromPoint; // defined standard
    }
    else if (document.caretRangeFromPoint) {
        return caretRangeFromPoint; // webkit implementation
    }
    else {
        return katamari_1.Optional.none; // unsupported browser
    }
})();
var fromPoint = function (win, x, y) {
    var doc = SugarElement_1.SugarElement.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) { return SimRange_1.SimRange.create(SugarElement_1.SugarElement.fromDom(rng.startContainer), rng.startOffset, SugarElement_1.SugarElement.fromDom(rng.endContainer), rng.endOffset); });
};
exports.fromPoint = fromPoint;
//# sourceMappingURL=CaretRange.js.map