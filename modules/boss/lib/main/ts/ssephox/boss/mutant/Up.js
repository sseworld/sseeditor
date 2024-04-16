import { Fun, Optional } from '@ssephox/katamari';
import * as Comparator from './Comparator';
const selector = (item, query) => {
    return item.parent.bind((parent) => {
        return Comparator.is(parent, query) ? Optional.some(parent) : selector(parent, query);
    });
};
const closest = (scope, query) => {
    return Comparator.is(scope, query) ? Optional.some(scope) : selector(scope, query);
};
const top = (item) => {
    return item.parent.fold(Fun.constant(item), (parent) => {
        return top(parent);
    });
};
const predicate = (item, f) => {
    return item.parent.bind((parent) => {
        return f(parent) ? Optional.some(parent) : predicate(parent, f);
    });
};
const all = (item) => {
    return item.parent.fold(Fun.constant([]), (parent) => {
        return [parent].concat(all(parent));
    });
};
export { selector, closest, predicate, all, top };
//# sourceMappingURL=Up.js.map