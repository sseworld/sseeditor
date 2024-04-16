import { Fun, Optional } from '@ssephox/katamari';
import * as Traverse from '../search/Traverse';
import * as Compare from './Compare';
/*
 * The exported functions in this module are:
 * a) path: Generates a list of child indices from the ancestor to the descendant
 * b) follow: Follows a path of child indices from an ancestor to reach a descendant
 */
const up = (descendant, stopper) => {
    if (stopper(descendant)) {
        return Optional.some([]);
    }
    else {
        return Traverse.parent(descendant).bind((parent) => Traverse.findIndex(descendant).bind((index) => up(parent, stopper)
            .map((rest) => rest.concat([index]))));
    }
};
const path = (ancestor, descendant) => {
    const stopper = Fun.curry(Compare.eq, ancestor);
    return Compare.eq(ancestor, descendant) ? Optional.some([]) : up(descendant, stopper);
};
const follow = (ancestor, descendantPath) => {
    if (descendantPath.length === 0) {
        return Optional.some(ancestor);
    }
    else {
        return Traverse.child(ancestor, descendantPath[0]).bind((child) => follow(child, descendantPath.slice(1)));
    }
};
export { path, follow };
//# sourceMappingURL=Hierarchy.js.map