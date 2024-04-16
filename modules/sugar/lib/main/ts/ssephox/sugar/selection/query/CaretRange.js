import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../../api/node/SugarElement';
import { SimRange } from '../../api/selection/SimRange';
const caretPositionFromPoint = (doc, x, y) => {
    var _a, _b;
    return Optional.from((_b = (_a = doc.dom).caretPositionFromPoint) === null || _b === void 0 ? void 0 : _b.call(_a, x, y))
        .bind((pos) => {
        // It turns out that Firefox can return null for pos.offsetNode
        if (pos.offsetNode === null) {
            return Optional.none();
        }
        const r = doc.dom.createRange();
        r.setStart(pos.offsetNode, pos.offset);
        r.collapse();
        return Optional.some(r);
    });
};
const caretRangeFromPoint = (doc, x, y) => { var _a, _b; return Optional.from((_b = (_a = doc.dom).caretRangeFromPoint) === null || _b === void 0 ? void 0 : _b.call(_a, x, y)); };
const availableSearch = (() => {
    if (document.caretPositionFromPoint) {
        return caretPositionFromPoint; // defined standard
    }
    else if (document.caretRangeFromPoint) {
        return caretRangeFromPoint; // webkit implementation
    }
    else {
        return Optional.none; // unsupported browser
    }
})();
const fromPoint = (win, x, y) => {
    const doc = SugarElement.fromDom(win.document);
    return availableSearch(doc, x, y).map((rng) => SimRange.create(SugarElement.fromDom(rng.startContainer), rng.startOffset, SugarElement.fromDom(rng.endContainer), rng.endOffset));
};
export { fromPoint };
//# sourceMappingURL=CaretRange.js.map