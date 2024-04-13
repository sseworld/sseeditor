import { Optional } from '@ssephox/katamari';
import { HTMLElementFullTagNameMap } from '../../alien/DomTypes';
import { SugarElement } from './SugarElement';
export type RootNode = SugarElement<Document | ShadowRoot>;
/**
 * Is the element a ShadowRoot?
 *
 * Note: this is insufficient to test if any element is a shadow root, but it is sufficient to differentiate between
 * a Document and a ShadowRoot.
 */
export declare const isShadowRoot: (dos: SugarElement<Node>) => dos is SugarElement<ShadowRoot>;
/**
 * Does the browser support shadow DOM?
 *
 * NOTE: Node.getRootNode() and Element.attachShadow don't exist on IE11 and pre-Chromium Edge.
 */
export declare const isSupported: () => boolean;
export declare const getRootNode: (e: SugarElement<Node>) => RootNode;
/** Create an element, using the actual document. */
export declare const createElement: {
    <K extends keyof HTMLElementFullTagNameMap>(dos: RootNode, tag: K): SugarElement<HTMLElementFullTagNameMap[K]>;
    (dos: RootNode, tag: string): SugarElement<HTMLElement>;
};
/** Where style tags need to go. ShadowRoot or document head */
export declare const getStyleContainer: (dos: RootNode) => SugarElement<HTMLHeadElement | ShadowRoot>;
/** Where content needs to go. ShadowRoot or document body */
export declare const getContentContainer: (dos: RootNode) => SugarElement<HTMLElement | ShadowRoot>;
/** Is this element either a ShadowRoot or a descendent of a ShadowRoot. */
export declare const isInShadowRoot: (e: SugarElement<Node>) => boolean;
/** If this element is in a ShadowRoot, return it. */
export declare const getShadowRoot: (e: SugarElement<Node>) => Optional<SugarElement<ShadowRoot>>;
/** Return the host of a ShadowRoot.
 *
 * This function will throw if Shadow DOM is unsupported in the browser, or if the host is null.
 * If you actually have a ShadowRoot, this shouldn't happen.
 */
export declare const getShadowHost: (e: SugarElement<ShadowRoot>) => SugarElement<Element>;
/**
 * When Events bubble up through a ShadowRoot, the browser changes the target to be the shadow host.
 * This function gets the "original" event target if possible.
 * This only works if the shadow tree is open - if the shadow tree is closed, event.target is returned.
 * See: https://developers.google.com/web/fundamentals/web-components/shadowdom#events
 */
export declare const getOriginalEventTarget: (event: Event) => Optional<EventTarget>;
export declare const isOpenShadowRoot: (sr: SugarElement<ShadowRoot>) => boolean;
export declare const isClosedShadowRoot: (sr: SugarElement<ShadowRoot>) => boolean;
/** Return true if the element is a host of an open shadow root.
 *  Return false if the element is a host of a closed shadow root, or if the element is not a host.
 */
export declare const isOpenShadowHost: (element: SugarElement<Element>) => boolean;
//# sourceMappingURL=SugarShadowDom.d.ts.map