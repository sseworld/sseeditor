import { Arr } from '@ssephox/katamari';
import * as Traverse from '../search/Traverse';
import * as InsertAll from './InsertAll';
const empty = (element) => {
    // shortcut "empty node" trick. Requires IE 9.
    element.dom.textContent = '';
    // If the contents was a single empty text node, the above doesn't remove it. But, it's still faster in general
    // than removing every child node manually.
    // The following is (probably) safe for performance as 99.9% of the time the trick works and
    // Traverse.children will return an empty array.
    Arr.each(Traverse.children(element), (rogue) => {
        remove(rogue);
    });
};
const remove = (element) => {
    const dom = element.dom;
    if (dom.parentNode !== null) {
        dom.parentNode.removeChild(dom);
    }
};
const unwrap = (wrapper) => {
    const children = Traverse.children(wrapper);
    if (children.length > 0) {
        InsertAll.after(wrapper, children);
    }
    remove(wrapper);
};
export { empty, remove, unwrap };
//# sourceMappingURL=Remove.js.map