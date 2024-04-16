import { Arr, Fun } from '@ssephox/katamari';
import * as Compare from '../dom/Compare';
import * as PredicateExists from './PredicateExists';
const ancestor = (element, target) => PredicateExists.ancestor(element, Fun.curry(Compare.eq, target));
const anyAncestor = (element, targets) => Arr.exists(targets, (target) => ancestor(element, target));
const sibling = (element, targets) => PredicateExists.sibling(element, (elem) => Arr.exists(targets, Fun.curry(Compare.eq, elem)));
const child = (element, target) => PredicateExists.child(element, Fun.curry(Compare.eq, target));
const descendant = (element, target) => PredicateExists.descendant(element, Fun.curry(Compare.eq, target));
export { ancestor, anyAncestor, sibling, child, descendant };
//# sourceMappingURL=Has.js.map