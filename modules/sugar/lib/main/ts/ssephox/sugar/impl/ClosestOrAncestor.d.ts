import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../api/node/SugarElement';
type TestFn = (e: SugarElement<Node>) => boolean;
type ScopeTestFn<T, R extends Node> = (scope: SugarElement<Node>, a: T) => scope is SugarElement<R>;
type AncestorFn<T, R extends Node> = (scope: SugarElement<Node>, predicate: T, isRoot?: TestFn) => Optional<SugarElement<R>>;
declare const _default: <T, R extends Node = Node>(is: ScopeTestFn<T, R>, ancestor: AncestorFn<T, R>, scope: SugarElement<Node>, a: T, isRoot?: TestFn) => Optional<SugarElement<R>>;
export default _default;
//# sourceMappingURL=ClosestOrAncestor.d.ts.map