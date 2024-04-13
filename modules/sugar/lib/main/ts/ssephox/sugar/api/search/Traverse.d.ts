import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
/**
 * The document associated with the current element
 * NOTE: this will throw if the owner is null.
 */
declare const owner: (element: SugarElement<Node>) => SugarElement<Document>;
/**
 * If the element is a document, return it. Otherwise, return its ownerDocument.
 * @param dos
 */
declare const documentOrOwner: (dos: SugarElement<Node>) => SugarElement<Document>;
declare const documentElement: (element: SugarElement<Node>) => SugarElement<HTMLElement>;
/**
 * The window element associated with the element
 * NOTE: this will throw if the defaultView is null.
 */
declare const defaultView: (element: SugarElement<Node>) => SugarElement<Window>;
declare const parent: (element: SugarElement<Node>) => Optional<SugarElement<Node & ParentNode>>;
declare const parentNode: (element: SugarElement<Node>) => Optional<SugarElement<Node>>;
declare const parentElement: (element: SugarElement<Node>) => Optional<SugarElement<HTMLElement>>;
declare const findIndex: (element: SugarElement<Node>) => Optional<number>;
declare const parents: (element: SugarElement<Node>, isRoot?: (e: SugarElement<Node>) => boolean) => SugarElement<Node>[];
declare const siblings: (element: SugarElement<Node>) => SugarElement<Node>[];
declare const offsetParent: (element: SugarElement<HTMLElement>) => Optional<SugarElement<HTMLElement>>;
declare const prevSibling: (element: SugarElement<Node>) => Optional<SugarElement<Node & ChildNode>>;
declare const nextSibling: (element: SugarElement<Node>) => Optional<SugarElement<Node & ChildNode>>;
declare const prevSiblings: (element: SugarElement<Node>) => SugarElement<Node & ChildNode>[];
declare const nextSiblings: (element: SugarElement<Node>) => SugarElement<Node & ChildNode>[];
declare const children: (element: SugarElement<Node>) => SugarElement<Node & ChildNode>[];
declare const child: (element: SugarElement<Node>, index: number) => Optional<SugarElement<Node & ChildNode>>;
declare const firstChild: (element: SugarElement<Node>) => Optional<SugarElement<Node & ChildNode>>;
declare const lastChild: (element: SugarElement<Node>) => Optional<SugarElement<Node & ChildNode>>;
declare const childNodesCount: (element: SugarElement<Node>) => number;
declare const hasChildNodes: (element: SugarElement<Node>) => boolean;
export interface ElementAndOffset<E> {
    readonly element: SugarElement<E>;
    readonly offset: number;
}
declare const leaf: (element: SugarElement<Node>, offset: number) => ElementAndOffset<Node>;
export { owner, documentOrOwner, defaultView, documentElement, parent, parentNode, parentElement, findIndex, parents, siblings, prevSibling, offsetParent, prevSiblings, nextSibling, nextSiblings, children, child, firstChild, lastChild, childNodesCount, hasChildNodes, leaf };
//# sourceMappingURL=Traverse.d.ts.map