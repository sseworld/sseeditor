import { Arr, Fun } from '@ssephox/katamari';
import * as Selectors from '../search/Selectors';
const eq = (e1, e2) => e1.dom === e2.dom;
const isEqualNode = (e1, e2) => e1.dom.isEqualNode(e2.dom);
const member = (element, elements) => Arr.exists(elements, Fun.curry(eq, element));
// Returns: true if node e1 contains e2, otherwise false.
// (returns false if e1===e2: A node does not contain itself).
const contains = (e1, e2) => {
    const d1 = e1.dom;
    const d2 = e2.dom;
    return d1 === d2 ? false : d1.contains(d2);
};
const is = Selectors.is;
export { eq, isEqualNode, member, contains, 
// Only used by DomUniverse. Remove (or should Selectors.is move here?)
is };
//# sourceMappingURL=Compare.js.map