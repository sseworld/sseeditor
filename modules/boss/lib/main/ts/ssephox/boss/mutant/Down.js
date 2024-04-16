import { Arr } from '@ssephox/katamari';
import * as Comparator from './Comparator';
const selector = (item, query) => {
    return Arr.bind(item.children || [], (child) => {
        const rest = selector(child, query);
        return Comparator.is(child, query) ? [child].concat(rest) : rest;
    });
};
const predicate = (item, pred) => {
    return Arr.bind(item.children || [], (child) => {
        const rest = predicate(child, pred);
        return pred(child) ? [child].concat(rest) : rest;
    });
};
export { selector, predicate };
//# sourceMappingURL=Down.js.map