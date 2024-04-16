// @ts-nocheck
import { Arr, Optional, Fun, Type } from "@ssephox/katamari";
import ClosestOrAncestor from "../../impl/ClosestOrAncestor";
import * as Compare from "../dom/Compare";
import * as SugarBody from "../node/SugarBody";
import { SugarElement } from "../node/SugarElement";
const first = (predicate) => descendant(SugarBody.body(), predicate);
const ancestor = (scope, predicate, isRoot) => {
    let element = scope.dom;
    const stop = Type.isFunction(isRoot) ? isRoot : Fun.never;
    while (element.parentNode) {
        element = element.parentNode;
        const el = SugarElement.fromDom(element);
        if (predicate(el)) {
            return Optional.some(el);
        }
        else if (stop(el)) {
            break;
        }
    }
    return Optional.none();
};
const closest = (scope, predicate, isRoot) => {
    // This is required to avoid ClosestOrAncestor passing the predicate to itself
    const is = (s, test) => test(s);
    return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot);
};
const sibling = (scope, predicate) => {
    const element = scope.dom;
    if (!element.parentNode) {
        return Optional.none();
    }
    return child(SugarElement.fromDom(element.parentNode), (x) => !Compare.eq(scope, x) && predicate(x));
};
const child = (scope, predicate) => {
    const pred = (node) => predicate(SugarElement.fromDom(node));
    const result = Arr.find(scope.dom.childNodes, pred);
    return result.map(SugarElement.fromDom);
};
const descendant = (scope, predicate) => {
    const descend = (node) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < node.childNodes.length; i++) {
            const child = SugarElement.fromDom(node.childNodes[i]);
            if (predicate(child)) {
                return Optional.some(child);
            }
            const res = descend(node.childNodes[i]);
            if (res.isSome()) {
                return res;
            }
        }
        return Optional.none();
    };
    return descend(scope.dom);
};
export { first, ancestor, closest, sibling, child, descendant };
//# sourceMappingURL=PredicateFind.js.map