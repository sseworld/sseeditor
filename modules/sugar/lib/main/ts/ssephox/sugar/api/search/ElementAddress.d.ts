import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
export interface AddressInAncestor<A, D, E> {
    readonly ancestor: SugarElement<A>;
    readonly descendants: ReadonlyArray<SugarElement<D>>;
    readonly element: SugarElement<E>;
    readonly index: number;
}
export interface AddressInParent<P, C, E> {
    readonly parent: SugarElement<P>;
    readonly children: ReadonlyArray<SugarElement<C>>;
    readonly element: SugarElement<E>;
    readonly index: number;
}
declare const childOf: (element: SugarElement<Node>, ancestor: SugarElement<Node>) => Optional<SugarElement<Node>>;
declare const indexInParent: <E extends Node>(element: SugarElement<E>) => Optional<AddressInParent<Node & ParentNode, Node & ChildNode, E>>;
declare const indexOf: (elements: SugarElement<Node>[], element: SugarElement<Node>) => Optional<number>;
declare const selectorsInParent: <E extends Node, S extends Element = Element>(element: SugarElement<E>, selector: string) => Optional<AddressInParent<Node & ParentNode, S, E>>;
declare const descendantsInAncestor: <E extends Node, A extends Element = Element, D extends Element = Element>(element: SugarElement<E>, ancestorSelector: string, descendantSelector: string) => Optional<AddressInAncestor<A, D, E>>;
export { childOf, indexOf, indexInParent, selectorsInParent, descendantsInAncestor };
//# sourceMappingURL=ElementAddress.d.ts.map