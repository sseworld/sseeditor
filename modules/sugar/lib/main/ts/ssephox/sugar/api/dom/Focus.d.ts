import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
import * as SugarShadowDom from '../node/SugarShadowDom';
type RootNode = SugarShadowDom.RootNode;
declare const focus: (element: SugarElement<HTMLElement>, preventScroll?: boolean) => void;
declare const blur: (element: SugarElement<HTMLElement>) => void;
declare const hasFocus: (element: SugarElement<Node>) => boolean;
declare const active: <T extends HTMLElement>(root?: RootNode) => Optional<SugarElement<T>>;
/** Focus the specified element, unless one of its descendents already has focus. */
declare const focusInside: (element: SugarElement<HTMLElement>) => void;
/**
 * Return the descendant element that has focus.
 * Use instead of SelectorFind.descendant(container, ':focus')
 *  because the :focus selector relies on keyboard focus.
 */
declare const search: (element: SugarElement<Node>) => Optional<SugarElement<HTMLElement>>;
export { hasFocus, focus, blur, active, search, focusInside };
//# sourceMappingURL=Focus.d.ts.map