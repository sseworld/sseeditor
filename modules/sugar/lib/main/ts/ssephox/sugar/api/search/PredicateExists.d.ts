import { SugarElement } from '../node/SugarElement';
declare const any: (predicate: (e: SugarElement<Node>) => boolean) => boolean;
declare const ancestor: (scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => boolean, isRoot?: (e: SugarElement<Node>) => boolean) => boolean;
declare const closest: (scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => boolean, isRoot?: (e: SugarElement<Node>) => boolean) => boolean;
declare const sibling: (scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => boolean) => boolean;
declare const child: (scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => boolean) => boolean;
declare const descendant: (scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => boolean) => boolean;
export { any, ancestor, closest, sibling, child, descendant };
//# sourceMappingURL=PredicateExists.d.ts.map