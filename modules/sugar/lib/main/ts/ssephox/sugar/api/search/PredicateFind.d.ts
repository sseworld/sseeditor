import { Optional } from "@ssephox/katamari";
import { SugarElement } from "../node/SugarElement";
declare const first: {
    <T extends Node = Node>(predicate: (e: SugarElement<Node>) => e is SugarElement<T>): Optional<SugarElement<T & ChildNode>>;
    (predicate: (e: SugarElement<Node>) => boolean): Optional<SugarElement<Node & ChildNode>>;
};
declare const ancestor: {
    <T extends Node = Node>(scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => e is SugarElement<T>, isRoot?: (e: SugarElement<Node>) => boolean): Optional<SugarElement<T>>;
    (scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => boolean, isRoot?: (e: SugarElement<Node>) => boolean): Optional<SugarElement<Node>>;
};
declare const closest: {
    <T extends Node = Node>(scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => e is SugarElement<T>, isRoot?: (e: SugarElement<Node>) => boolean): Optional<SugarElement<T>>;
    (scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => boolean, isRoot?: (e: SugarElement<Node>) => boolean): Optional<SugarElement<Node>>;
};
declare const sibling: {
    <T extends Node = Node>(scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => e is SugarElement<T>): Optional<SugarElement<T & ChildNode>>;
    (scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => boolean): Optional<SugarElement<Node & ChildNode>>;
};
declare const child: {
    <T extends Node = Node>(scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => e is SugarElement<T>): Optional<SugarElement<T & ChildNode>>;
    (scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => boolean): Optional<SugarElement<Node & ChildNode>>;
};
declare const descendant: {
    <T extends Node = Node>(scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => e is SugarElement<T>): Optional<SugarElement<T & ChildNode>>;
    (scope: SugarElement<Node>, predicate: (e: SugarElement<Node>) => boolean): Optional<SugarElement<Node & ChildNode>>;
};
export { first, ancestor, closest, sibling, child, descendant };
//# sourceMappingURL=PredicateFind.d.ts.map