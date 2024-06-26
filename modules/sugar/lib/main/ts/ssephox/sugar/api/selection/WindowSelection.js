import { Optional } from '@ssephox/katamari';
import * as NativeRange from '../../selection/core/NativeRange';
import * as SelectionDirection from '../../selection/core/SelectionDirection';
import * as CaretRange from '../../selection/query/CaretRange';
import * as Within from '../../selection/query/Within';
import * as Prefilter from '../../selection/quirks/Prefilter';
import * as Compare from '../dom/Compare';
import * as DocumentPosition from '../dom/DocumentPosition';
import { SugarElement } from '../node/SugarElement';
import * as SugarFragment from '../node/SugarFragment';
import { SimRange } from './SimRange';
import { SimSelection } from './SimSelection';
const getNativeSelection = (win) => Optional.from(win.getSelection());
const doSetNativeRange = (win, rng) => {
    getNativeSelection(win).each((selection) => {
        selection.removeAllRanges();
        selection.addRange(rng);
    });
};
const doSetRange = (win, start, soffset, finish, foffset) => {
    const rng = NativeRange.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
};
const findWithin = (win, selection, selector) => Within.find(win, selection, selector);
const setLegacyRtlRange = (win, selection, start, soffset, finish, foffset) => {
    selection.collapse(start.dom, soffset);
    selection.extend(finish.dom, foffset);
};
const setRangeFromRelative = (win, relative) => SelectionDirection.diagnose(win, relative).match({
    ltr: (start, soffset, finish, foffset) => {
        doSetRange(win, start, soffset, finish, foffset);
    },
    rtl: (start, soffset, finish, foffset) => {
        getNativeSelection(win).each((selection) => {
            // If this selection is backwards, then we need to use extend.
            if (selection.setBaseAndExtent) {
                selection.setBaseAndExtent(start.dom, soffset, finish.dom, foffset);
            }
            else if (selection.extend) {
                // This try catch is for older browsers (Firefox 52) as they're sometimes unable to handle setting backwards selections using selection.extend and error out.
                try {
                    setLegacyRtlRange(win, selection, start, soffset, finish, foffset);
                }
                catch (e) {
                    // If it does fail, try again with ltr.
                    doSetRange(win, finish, foffset, start, soffset);
                }
            }
            else {
                doSetRange(win, finish, foffset, start, soffset);
            }
        });
    }
});
const setExact = (win, start, soffset, finish, foffset) => {
    const relative = Prefilter.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
};
const setRelative = (win, startSitu, finishSitu) => {
    const relative = Prefilter.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
};
const toNative = (selection) => {
    const win = SimSelection.getWin(selection).dom;
    const getDomRange = (start, soffset, finish, foffset) => NativeRange.exactToNative(win, start, soffset, finish, foffset);
    const filtered = Prefilter.preprocess(selection);
    return SelectionDirection.diagnose(win, filtered).match({
        ltr: getDomRange,
        rtl: getDomRange
    });
};
// NOTE: We are still reading the range because it gives subtly different behaviour
// than using the anchorNode and focusNode. I'm not sure if this behaviour is any
// better or worse; it's just different.
const readRange = (selection) => {
    if (selection.rangeCount > 0) {
        const firstRng = selection.getRangeAt(0);
        const lastRng = selection.getRangeAt(selection.rangeCount - 1);
        return Optional.some(SimRange.create(SugarElement.fromDom(firstRng.startContainer), firstRng.startOffset, SugarElement.fromDom(lastRng.endContainer), lastRng.endOffset));
    }
    else {
        return Optional.none();
    }
};
const doGetExact = (selection) => {
    if (selection.anchorNode === null || selection.focusNode === null) {
        return readRange(selection);
    }
    else {
        const anchor = SugarElement.fromDom(selection.anchorNode);
        const focus = SugarElement.fromDom(selection.focusNode);
        // if this returns true anchor is _after_ focus, so we need a custom selection object to maintain the RTL selection
        return DocumentPosition.after(anchor, selection.anchorOffset, focus, selection.focusOffset) ? Optional.some(SimRange.create(anchor, selection.anchorOffset, focus, selection.focusOffset)) : readRange(selection);
    }
};
const setToElement = (win, element, selectNodeContents = true) => {
    const rngGetter = selectNodeContents ? NativeRange.selectNodeContents : NativeRange.selectNode;
    const rng = rngGetter(win, element);
    doSetNativeRange(win, rng);
};
const forElement = (win, element) => {
    const rng = NativeRange.selectNodeContents(win, element);
    return SimRange.create(SugarElement.fromDom(rng.startContainer), rng.startOffset, SugarElement.fromDom(rng.endContainer), rng.endOffset);
};
const getExact = (win) => 
// We want to retrieve the selection as it is.
getNativeSelection(win)
    .filter((sel) => sel.rangeCount > 0)
    .bind(doGetExact);
// TODO: Test this.
const get = (win) => getExact(win).map((range) => SimSelection.exact(range.start, range.soffset, range.finish, range.foffset));
const getFirstRect = (win, selection) => {
    const rng = SelectionDirection.asLtrRange(win, selection);
    return NativeRange.getFirstRect(rng);
};
const getBounds = (win, selection) => {
    const rng = SelectionDirection.asLtrRange(win, selection);
    return NativeRange.getBounds(rng);
};
const getAtPoint = (win, x, y) => CaretRange.fromPoint(win, x, y);
const getAsString = (win, selection) => {
    const rng = SelectionDirection.asLtrRange(win, selection);
    return NativeRange.toString(rng);
};
const clear = (win) => {
    getNativeSelection(win).each((selection) => selection.removeAllRanges());
};
const clone = (win, selection) => {
    const rng = SelectionDirection.asLtrRange(win, selection);
    return NativeRange.cloneFragment(rng);
};
const replace = (win, selection, elements) => {
    const rng = SelectionDirection.asLtrRange(win, selection);
    const fragment = SugarFragment.fromElements(elements, win.document);
    NativeRange.replaceWith(rng, fragment);
};
const deleteAt = (win, selection) => {
    const rng = SelectionDirection.asLtrRange(win, selection);
    NativeRange.deleteContents(rng);
};
const isCollapsed = (start, soffset, finish, foffset) => Compare.eq(start, finish) && soffset === foffset;
export { setExact, getExact, get, setRelative, toNative, setToElement, clear, clone, replace, deleteAt, forElement, getFirstRect, getBounds, getAtPoint, findWithin, getAsString, isCollapsed };
//# sourceMappingURL=WindowSelection.js.map