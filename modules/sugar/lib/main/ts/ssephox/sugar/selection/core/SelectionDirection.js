"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asLtrRange = exports.diagnose = exports.rtl = exports.ltr = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("../../api/node/SugarElement");
var NativeRange = require("./NativeRange");
var adt = katamari_1.Adt.generate([
    { ltr: ['start', 'soffset', 'finish', 'foffset'] },
    { rtl: ['start', 'soffset', 'finish', 'foffset'] }
]);
var fromRange = function (win, type, range) {
    return type(SugarElement_1.SugarElement.fromDom(range.startContainer), range.startOffset, SugarElement_1.SugarElement.fromDom(range.endContainer), range.endOffset);
};
var getRanges = function (win, selection) { return selection.match({
    domRange: function (rng) {
        return {
            ltr: katamari_1.Fun.constant(rng),
            rtl: katamari_1.Optional.none
        };
    },
    relative: function (startSitu, finishSitu) {
        return {
            ltr: katamari_1.Thunk.cached(function () { return NativeRange.relativeToNative(win, startSitu, finishSitu); }),
            rtl: katamari_1.Thunk.cached(function () { return katamari_1.Optional.some(NativeRange.relativeToNative(win, finishSitu, startSitu)); })
        };
    },
    exact: function (start, soffset, finish, foffset) {
        return {
            ltr: katamari_1.Thunk.cached(function () { return NativeRange.exactToNative(win, start, soffset, finish, foffset); }),
            rtl: katamari_1.Thunk.cached(function () { return katamari_1.Optional.some(NativeRange.exactToNative(win, finish, foffset, start, soffset)); })
        };
    }
}); };
var doDiagnose = function (win, ranges) {
    // If we cannot create a ranged selection from start > finish, it could be RTL
    var rng = ranges.ltr();
    if (rng.collapsed) {
        // Let's check if it's RTL ... if it is, then reversing the direction will not be collapsed
        var reversed = ranges.rtl().filter(function (rev) { return rev.collapsed === false; });
        return reversed.map(function (rev) {
            // We need to use "reversed" here, because the original only has one point (collapsed)
            return adt.rtl(SugarElement_1.SugarElement.fromDom(rev.endContainer), rev.endOffset, SugarElement_1.SugarElement.fromDom(rev.startContainer), rev.startOffset);
        }).getOrThunk(function () { return fromRange(win, adt.ltr, rng); });
    }
    else {
        return fromRange(win, adt.ltr, rng);
    }
};
var diagnose = function (win, selection) {
    var ranges = getRanges(win, selection);
    return doDiagnose(win, ranges);
};
exports.diagnose = diagnose;
var asLtrRange = function (win, selection) {
    var diagnosis = diagnose(win, selection);
    return diagnosis.match({
        ltr: function (start, soffset, finish, foffset) {
            var rng = win.document.createRange();
            rng.setStart(start.dom, soffset);
            rng.setEnd(finish.dom, foffset);
            return rng;
        },
        rtl: function (start, soffset, finish, foffset) {
            // NOTE: Reversing start and finish
            var rng = win.document.createRange();
            rng.setStart(finish.dom, foffset);
            rng.setEnd(start.dom, soffset);
            return rng;
        }
    });
};
exports.asLtrRange = asLtrRange;
var ltr = adt.ltr;
exports.ltr = ltr;
var rtl = adt.rtl;
exports.rtl = rtl;
//# sourceMappingURL=SelectionDirection.js.map