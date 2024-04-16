import { Optional } from '@ssephox/katamari';
import * as SugarDocument from '../node/SugarDocument';
import { SugarElement } from '../node/SugarElement';
import * as SugarShadowDom from '../node/SugarShadowDom';
const focus = (element, preventScroll = false) => element.dom.focus({ preventScroll });
const blur = (element) => element.dom.blur();
const hasFocus = (element) => {
    const root = SugarShadowDom.getRootNode(element).dom;
    return element.dom === root.activeElement;
};
// Note: assuming that activeElement will always be a HTMLElement (maybe we should add a runtime check?)
const active = (root = SugarDocument.getDocument()) => Optional.from(root.dom.activeElement).map(SugarElement.fromDom);
/** Focus the specified element, unless one of its descendents already has focus. */
const focusInside = (element) => {
    const alreadyFocusedInside = search(element).isSome();
    if (!alreadyFocusedInside) {
        focus(element);
    }
};
/**
 * Return the descendant element that has focus.
 * Use instead of SelectorFind.descendant(container, ':focus')
 *  because the :focus selector relies on keyboard focus.
 */
const search = (element) => active(SugarShadowDom.getRootNode(element))
    .filter((e) => element.dom.contains(e.dom));
export { hasFocus, focus, blur, active, search, focusInside };
//# sourceMappingURL=Focus.js.map