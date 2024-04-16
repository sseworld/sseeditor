import { Fun, Optional, Type } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
const ensureIsRoot = (isRoot) => Type.isFunction(isRoot) ? isRoot : Fun.never;
const ancestor = (scope, transform, isRoot) => {
    let element = scope.dom;
    const stop = ensureIsRoot(isRoot);
    while (element.parentNode) {
        element = element.parentNode;
        const el = SugarElement.fromDom(element);
        const transformed = transform(el);
        if (transformed.isSome()) {
            return transformed;
        }
        else if (stop(el)) {
            break;
        }
    }
    return Optional.none();
};
const closest = (scope, transform, isRoot) => {
    const current = transform(scope);
    const stop = ensureIsRoot(isRoot);
    return current.orThunk(() => stop(scope) ? Optional.none() : ancestor(scope, transform, stop));
};
export { ancestor, closest };
//# sourceMappingURL=TransformFind.js.map