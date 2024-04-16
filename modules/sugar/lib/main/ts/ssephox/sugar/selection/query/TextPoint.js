import { Arr, Optional } from '@ssephox/katamari';
import * as SugarText from '../../api/node/SugarText';
import * as Geometry from '../alien/Geometry';
const locateOffset = (doc, textnode, x, y, rect) => {
    const rangeForOffset = (o) => {
        const r = doc.dom.createRange();
        r.setStart(textnode.dom, o);
        r.collapse(true);
        return r;
    };
    const rectForOffset = (o) => {
        const r = rangeForOffset(o);
        return r.getBoundingClientRect();
    };
    const length = SugarText.get(textnode).length;
    const offset = Geometry.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
};
const locate = (doc, node, x, y) => {
    const r = doc.dom.createRange();
    r.selectNode(node.dom);
    const rects = r.getClientRects();
    const foundRect = Arr.findMap(rects, (rect) => Geometry.inRect(rect, x, y) ? Optional.some(rect) : Optional.none());
    return foundRect.map((rect) => locateOffset(doc, node, x, y, rect));
};
export { locate };
//# sourceMappingURL=TextPoint.js.map