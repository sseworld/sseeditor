import { Optional } from '@ssephox/katamari';
import * as PredicateFind from '../search/PredicateFind';
import * as Traverse from '../search/Traverse';
import * as Awareness from './Awareness';
const first = (element) => PredicateFind.descendant(element, Awareness.isCursorPosition);
const last = (element) => descendantRtl(element, Awareness.isCursorPosition);
// Note, sugar probably needs some RTL traversals.
const descendantRtl = (scope, predicate) => {
    const descend = (element) => {
        const children = Traverse.children(element);
        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            if (predicate(child)) {
                return Optional.some(child);
            }
            const res = descend(child);
            if (res.isSome()) {
                return res;
            }
        }
        return Optional.none();
    };
    return descend(scope);
};
export { first, last };
//# sourceMappingURL=CursorPosition.js.map