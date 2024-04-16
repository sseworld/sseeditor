import { Arr, Fun, Optional, Type } from '@ssephox/katamari';
import * as Traverse from '../search/Traverse';
import { SugarElement } from './SugarElement';
import * as SugarHead from './SugarHead';
import * as SugarNode from './SugarNode';
/**
 * Is the element a ShadowRoot?
 *
 * Note: this is insufficient to test if any element is a shadow root, but it is sufficient to differentiate between
 * a Document and a ShadowRoot.
 */
export const isShadowRoot = (dos) => SugarNode.isDocumentFragment(dos) && Type.isNonNullable(dos.dom.host);
/* eslint-disable @tinymce/no-implicit-dom-globals, @typescript-eslint/unbound-method */
const supported = Type.isFunction(Element.prototype.attachShadow) &&
    Type.isFunction(Node.prototype.getRootNode);
/* eslint-enable */
/**
 * Does the browser support shadow DOM?
 *
 * NOTE: Node.getRootNode() and Element.attachShadow don't exist on IE11 and pre-Chromium Edge.
 */
export const isSupported = Fun.constant(supported);
export const getRootNode = supported
    ? (e) => SugarElement.fromDom(e.dom.getRootNode())
    : Traverse.documentOrOwner;
/** Create an element, using the actual document. */
export const createElement = (dos, tag) => SugarElement.fromTag(tag, Traverse.documentOrOwner(dos).dom);
/** Where style tags need to go. ShadowRoot or document head */
export const getStyleContainer = (dos) => isShadowRoot(dos) ? dos : SugarHead.getHead(Traverse.documentOrOwner(dos));
/** Where content needs to go. ShadowRoot or document body */
export const getContentContainer = (dos) => 
// Can't use SugarBody.body without causing a circular module reference (since SugarBody.inBody uses SugarShadowDom)
isShadowRoot(dos) ? dos : SugarElement.fromDom(Traverse.documentOrOwner(dos).dom.body);
/** Is this element either a ShadowRoot or a descendent of a ShadowRoot. */
export const isInShadowRoot = (e) => getShadowRoot(e).isSome();
/** If this element is in a ShadowRoot, return it. */
export const getShadowRoot = (e) => {
    const r = getRootNode(e);
    return isShadowRoot(r) ? Optional.some(r) : Optional.none();
};
/** Return the host of a ShadowRoot.
 *
 * This function will throw if Shadow DOM is unsupported in the browser, or if the host is null.
 * If you actually have a ShadowRoot, this shouldn't happen.
 */
export const getShadowHost = (e) => SugarElement.fromDom(e.dom.host);
/**
 * When Events bubble up through a ShadowRoot, the browser changes the target to be the shadow host.
 * This function gets the "original" event target if possible.
 * This only works if the shadow tree is open - if the shadow tree is closed, event.target is returned.
 * See: https://developers.google.com/web/fundamentals/web-components/shadowdom#events
 */
export const getOriginalEventTarget = (event) => {
    if (isSupported() && Type.isNonNullable(event.target)) {
        const el = SugarElement.fromDom(event.target);
        if (SugarNode.isElement(el) && isOpenShadowHost(el)) {
            // When target element is inside Shadow DOM we need to take first element from composedPath
            // otherwise we'll get Shadow Root parent, not actual target element.
            if (event.composed && event.composedPath) {
                const composedPath = event.composedPath();
                if (composedPath) {
                    return Arr.head(composedPath);
                }
            }
        }
    }
    return Optional.from(event.target);
};
export const isOpenShadowRoot = (sr) => sr.dom.mode === 'open';
export const isClosedShadowRoot = (sr) => sr.dom.mode === 'closed';
/** Return true if the element is a host of an open shadow root.
 *  Return false if the element is a host of a closed shadow root, or if the element is not a host.
 */
export const isOpenShadowHost = (element) => Type.isNonNullable(element.dom.shadowRoot);
//# sourceMappingURL=SugarShadowDom.js.map