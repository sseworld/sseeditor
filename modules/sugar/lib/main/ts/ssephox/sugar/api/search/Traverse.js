import { Arr, Fun, Optional, Type } from '@ssephox/katamari';
import * as Recurse from '../../alien/Recurse';
import * as Compare from '../dom/Compare';
import { SugarElement } from '../node/SugarElement';
import * as SugarNode from '../node/SugarNode';
/**
 * The document associated with the current element
 * NOTE: this will throw if the owner is null.
 */
const owner = (element) => SugarElement.fromDom(element.dom.ownerDocument);
/**
 * If the element is a document, return it. Otherwise, return its ownerDocument.
 * @param dos
 */
const documentOrOwner = (dos) => SugarNode.isDocument(dos) ? dos : owner(dos);
const documentElement = (element) => SugarElement.fromDom(documentOrOwner(element).dom.documentElement);
/**
 * The window element associated with the element
 * NOTE: this will throw if the defaultView is null.
 */
const defaultView = (element) => SugarElement.fromDom(documentOrOwner(element).dom.defaultView);
const parent = (element) => Optional.from(element.dom.parentNode).map(SugarElement.fromDom);
// Cast down to just be SugarElement<Node>
const parentNode = (element) => parent(element);
const parentElement = (element) => Optional.from(element.dom.parentElement).map(SugarElement.fromDom);
const findIndex = (element) => parent(element).bind((p) => {
    // TODO: Refactor out children so we can avoid the constant unwrapping
    const kin = children(p);
    return Arr.findIndex(kin, (elem) => Compare.eq(element, elem));
});
const parents = (element, isRoot) => {
    const stop = Type.isFunction(isRoot) ? isRoot : Fun.never;
    // This is used a *lot* so it needs to be performant, not recursive
    let dom = element.dom;
    const ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
        const rawParent = dom.parentNode;
        const p = SugarElement.fromDom(rawParent);
        ret.push(p);
        if (stop(p) === true) {
            break;
        }
        else {
            dom = rawParent;
        }
    }
    return ret;
};
const siblings = (element) => {
    // TODO: Refactor out children so we can just not add self instead of filtering afterwards
    const filterSelf = (elements) => Arr.filter(elements, (x) => !Compare.eq(element, x));
    return parent(element).map(children).map(filterSelf).getOr([]);
};
const offsetParent = (element) => Optional.from(element.dom.offsetParent).map(SugarElement.fromDom);
const prevSibling = (element) => Optional.from(element.dom.previousSibling).map(SugarElement.fromDom);
const nextSibling = (element) => Optional.from(element.dom.nextSibling).map(SugarElement.fromDom);
// This one needs to be reversed, so they're still in DOM order
const prevSiblings = (element) => Arr.reverse(Recurse.toArray(element, prevSibling));
const nextSiblings = (element) => Recurse.toArray(element, nextSibling);
const children = (element) => Arr.map(element.dom.childNodes, SugarElement.fromDom);
const child = (element, index) => {
    const cs = element.dom.childNodes;
    return Optional.from(cs[index]).map(SugarElement.fromDom);
};
const firstChild = (element) => child(element, 0);
const lastChild = (element) => child(element, element.dom.childNodes.length - 1);
const childNodesCount = (element) => element.dom.childNodes.length;
const hasChildNodes = (element) => element.dom.hasChildNodes();
const spot = (element, offset) => ({
    element,
    offset
});
const leaf = (element, offset) => {
    const cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
};
export { owner, documentOrOwner, defaultView, documentElement, parent, parentNode, parentElement, findIndex, parents, siblings, prevSibling, offsetParent, prevSiblings, nextSibling, nextSiblings, children, child, firstChild, lastChild, childNodesCount, hasChildNodes, leaf };
//# sourceMappingURL=Traverse.js.map