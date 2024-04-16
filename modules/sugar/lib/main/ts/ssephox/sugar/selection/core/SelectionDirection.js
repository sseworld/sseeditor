import { Adt, Fun, Optional, Thunk } from '@ssephox/katamari';
import { SugarElement } from '../../api/node/SugarElement';
import * as NativeRange from './NativeRange';
const adt = Adt.generate([
    { ltr: ['start', 'soffset', 'finish', 'foffset'] },
    { rtl: ['start', 'soffset', 'finish', 'foffset'] }
]);
const fromRange = (win, type, range) => type(SugarElement.fromDom(range.startContainer), range.startOffset, SugarElement.fromDom(range.endContainer), range.endOffset);
const getRanges = (win, selection) => selection.match({
    domRange: (rng) => {
        return {
            ltr: Fun.constant(rng),
            rtl: Optional.none
        };
    },
    relative: (startSitu, finishSitu) => {
        return {
            ltr: Thunk.cached(() => NativeRange.relativeToNative(win, startSitu, finishSitu)),
            rtl: Thunk.cached(() => Optional.some(NativeRange.relativeToNative(win, finishSitu, startSitu)))
        };
    },
    exact: (start, soffset, finish, foffset) => {
        return {
            ltr: Thunk.cached(() => NativeRange.exactToNative(win, start, soffset, finish, foffset)),
            rtl: Thunk.cached(() => Optional.some(NativeRange.exactToNative(win, finish, foffset, start, soffset)))
        };
    }
});
const doDiagnose = (win, ranges) => {
    // If we cannot create a ranged selection from start > finish, it could be RTL
    const rng = ranges.ltr();
    if (rng.collapsed) {
        // Let's check if it's RTL ... if it is, then reversing the direction will not be collapsed
        const reversed = ranges.rtl().filter((rev) => rev.collapsed === false);
        return reversed.map((rev) => 
        // We need to use "reversed" here, because the original only has one point (collapsed)
        adt.rtl(SugarElement.fromDom(rev.endContainer), rev.endOffset, SugarElement.fromDom(rev.startContainer), rev.startOffset)).getOrThunk(() => fromRange(win, adt.ltr, rng));
    }
    else {
        return fromRange(win, adt.ltr, rng);
    }
};
const diagnose = (win, selection) => {
    const ranges = getRanges(win, selection);
    return doDiagnose(win, ranges);
};
const asLtrRange = (win, selection) => {
    const diagnosis = diagnose(win, selection);
    return diagnosis.match({
        ltr: (start, soffset, finish, foffset) => {
            const rng = win.document.createRange();
            rng.setStart(start.dom, soffset);
            rng.setEnd(finish.dom, foffset);
            return rng;
        },
        rtl: (start, soffset, finish, foffset) => {
            // NOTE: Reversing start and finish
            const rng = win.document.createRange();
            rng.setStart(finish.dom, foffset);
            rng.setEnd(start.dom, soffset);
            return rng;
        }
    });
};
const ltr = adt.ltr;
const rtl = adt.rtl;
export { ltr, rtl, diagnose, asLtrRange };
//# sourceMappingURL=SelectionDirection.js.map