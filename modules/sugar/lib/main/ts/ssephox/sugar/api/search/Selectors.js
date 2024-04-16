import { Arr, Optional } from '@ssephox/katamari';
import { DOCUMENT, DOCUMENT_FRAGMENT, ELEMENT } from '../node/NodeTypes';
import { SugarElement } from '../node/SugarElement';
const is = (element, selector) => {
    const dom = element.dom;
    if (dom.nodeType !== ELEMENT) {
        return false;
    }
    else {
        const elem = dom;
        if (elem.matches !== undefined) {
            return elem.matches(selector);
        }
        else if (elem.msMatchesSelector !== undefined) {
            return elem.msMatchesSelector(selector);
        }
        else if (elem.webkitMatchesSelector !== undefined) {
            return elem.webkitMatchesSelector(selector);
        }
        else if (elem.mozMatchesSelector !== undefined) {
            // cast to any as mozMatchesSelector doesn't exist in TS DOM lib
            return elem.mozMatchesSelector(selector);
        }
        else {
            throw new Error('Browser lacks native selectors');
        } // unfortunately we can't throw this on startup :(
    }
};
const bypassSelector = (dom) => 
// Only elements, documents and shadow roots support querySelector
// shadow root element type is DOCUMENT_FRAGMENT
dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT && dom.nodeType !== DOCUMENT_FRAGMENT ||
    // IE fix for complex queries on empty nodes: http://jsfiddle.net/spyder/fv9ptr5L/
    dom.childElementCount === 0;
const all = (selector, scope) => {
    const base = scope === undefined ? document : scope.dom;
    return bypassSelector(base) ? [] : Arr.map(base.querySelectorAll(selector), SugarElement.fromDom);
};
const one = (selector, scope) => {
    const base = scope === undefined ? document : scope.dom;
    return bypassSelector(base) ? Optional.none() : Optional.from(base.querySelector(selector)).map(SugarElement.fromDom);
};
export { all, is, one };
//# sourceMappingURL=Selectors.js.map