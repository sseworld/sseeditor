import { Arr } from '@ssephox/katamari';
import * as SugarBody from '../node/SugarBody';
import * as Traverse from './Traverse';
// maybe TraverseWith, similar to traverse but with a predicate?
const all = (predicate) => descendants(SugarBody.body(), predicate);
const ancestors = (scope, predicate, isRoot) => Arr.filter(Traverse.parents(scope, isRoot), predicate);
const siblings = (scope, predicate) => Arr.filter(Traverse.siblings(scope), predicate);
const children = (scope, predicate) => Arr.filter(Traverse.children(scope), predicate);
const descendants = (scope, predicate) => {
    let result = [];
    // Recurse.toArray() might help here
    Arr.each(Traverse.children(scope), (x) => {
        if (predicate(x)) {
            result = result.concat([x]);
        }
        result = result.concat(descendants(x, predicate));
    });
    return result;
};
export { all, ancestors, siblings, children, descendants };
//# sourceMappingURL=PredicateFilter.js.map