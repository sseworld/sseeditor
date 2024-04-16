import { Arr, Fun } from '@ssephox/katamari';
import * as Compare from '../dom/Compare';
import * as PredicateFind from './PredicateFind';
import * as SelectorFilter from './SelectorFilter';
import * as SelectorFind from './SelectorFind';
import * as Traverse from './Traverse';
const inAncestor = (ancestor, descendants, element, index) => ({
    ancestor,
    descendants,
    element,
    index
});
const inParent = (parent, children, element, index) => ({
    parent,
    children,
    element,
    index
});
const childOf = (element, ancestor) => PredicateFind.closest(element, (elem) => Traverse.parent(elem).exists((parent) => Compare.eq(parent, ancestor)));
const indexInParent = (element) => Traverse.parent(element).bind((parent) => {
    const children = Traverse.children(parent);
    return indexOf(children, element).map((index) => inParent(parent, children, element, index));
});
const indexOf = (elements, element) => Arr.findIndex(elements, Fun.curry(Compare.eq, element));
const selectorsInParent = (element, selector) => Traverse.parent(element).bind((parent) => {
    const children = SelectorFilter.children(parent, selector);
    return indexOf(children, element).map((index) => inParent(parent, children, element, index));
});
const descendantsInAncestor = (element, ancestorSelector, descendantSelector) => SelectorFind.closest(element, ancestorSelector).bind((ancestor) => {
    const descendants = SelectorFilter.descendants(ancestor, descendantSelector);
    return indexOf(descendants, element).map((index) => inAncestor(ancestor, descendants, element, index));
});
export { childOf, indexOf, indexInParent, selectorsInParent, descendantsInAncestor };
//# sourceMappingURL=ElementAddress.js.map