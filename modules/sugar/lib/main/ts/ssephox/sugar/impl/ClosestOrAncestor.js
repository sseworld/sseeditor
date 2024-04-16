import { Optional, Type } from '@ssephox/katamari';
export default (is, ancestor, scope, a, isRoot) => {
    if (is(scope, a)) {
        return Optional.some(scope);
    }
    else if (Type.isFunction(isRoot) && isRoot(scope)) {
        return Optional.none();
    }
    else {
        return ancestor(scope, a, isRoot);
    }
};
//# sourceMappingURL=ClosestOrAncestor.js.map