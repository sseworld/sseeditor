import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../../api/node/SugarElement';
const selectNode = (win, element) => {
    const rng = win.document.createRange();
    rng.selectNode(element.dom);
    return rng;
};
const selectNodeContents = (win, element) => {
    const rng = win.document.createRange();
    selectNodeContentsUsing(rng, element);
    return rng;
};
const selectNodeContentsUsing = (rng, element) => rng.selectNodeContents(element.dom);
const isWithin = (outerRange, innerRange) => 
// Adapted from: http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
innerRange.compareBoundaryPoints(outerRange.END_TO_START, outerRange) < 1 && innerRange.compareBoundaryPoints(outerRange.START_TO_END, outerRange) > -1;
const create = (win) => win.document.createRange();
// NOTE: Mutates the range.
const setStart = (rng, situ) => {
    situ.fold((e) => {
        rng.setStartBefore(e.dom);
    }, (e, o) => {
        rng.setStart(e.dom, o);
    }, (e) => {
        rng.setStartAfter(e.dom);
    });
};
const setFinish = (rng, situ) => {
    situ.fold((e) => {
        rng.setEndBefore(e.dom);
    }, (e, o) => {
        rng.setEnd(e.dom, o);
    }, (e) => {
        rng.setEndAfter(e.dom);
    });
};
const replaceWith = (rng, fragment) => {
    // Note: this document fragment approach may not work on IE9.
    deleteContents(rng);
    rng.insertNode(fragment.dom);
};
const relativeToNative = (win, startSitu, finishSitu) => {
    const range = win.document.createRange();
    setStart(range, startSitu);
    setFinish(range, finishSitu);
    return range;
};
const exactToNative = (win, start, soffset, finish, foffset) => {
    const rng = win.document.createRange();
    rng.setStart(start.dom, soffset);
    rng.setEnd(finish.dom, foffset);
    return rng;
};
const deleteContents = (rng) => {
    rng.deleteContents();
};
const cloneFragment = (rng) => {
    const fragment = rng.cloneContents();
    return SugarElement.fromDom(fragment);
};
const toRect = (rect) => ({
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height
});
const getFirstRect = (rng) => {
    const rects = rng.getClientRects();
    // ASSUMPTION: The first rectangle is the start of the selection
    const rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? Optional.some(rect).map(toRect) : Optional.none();
};
const getBounds = (rng) => {
    const rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? Optional.some(rect).map(toRect) : Optional.none();
};
const toString = (rng) => rng.toString();
export { create, replaceWith, selectNode, selectNodeContents, selectNodeContentsUsing, relativeToNative, exactToNative, deleteContents, cloneFragment, getFirstRect, getBounds, isWithin, toString };
//# sourceMappingURL=NativeRange.js.map