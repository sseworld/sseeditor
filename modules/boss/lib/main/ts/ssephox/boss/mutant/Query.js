import { Arr, Optional } from '@ssephox/katamari';
import * as Properties from './Properties';
import * as Up from './Up';
const extract = (item) => {
    const self = item.id;
    const rest = item.children && item.children.length > 0 ? Arr.bind(item.children, extract) : [];
    return [self].concat(rest);
};
// TODO: This is broken. See TINY-6501, but the gist is that the behaviour of this function should match
//  https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition and it doesn't.
const comparePosition = (item, other) => {
    // horribly inefficient
    const top = Up.top(item);
    const all = extract(top);
    const itemIndex = Arr.findIndex(all, (x) => {
        return item.id === x;
    });
    const otherIndex = Arr.findIndex(all, (x) => {
        return other.id === x;
    });
    return itemIndex.bind((iIndex) => {
        return otherIndex.map((oIndex) => {
            if (iIndex < oIndex) {
                return 4;
            }
            else {
                return 2;
            }
        });
    }).getOr(0);
};
const prevSibling = (item) => {
    const parent = Properties.parent(item);
    const kin = parent.map(Properties.children).getOr([]);
    const itemIndex = Arr.findIndex(kin, (x) => {
        return item.id === x.id;
    });
    return itemIndex.bind((iIndex) => {
        return iIndex > 0 ? Optional.some(kin[iIndex - 1]) : Optional.none();
    });
};
const nextSibling = (item) => {
    const parent = Properties.parent(item);
    const kin = parent.map(Properties.children).getOr([]);
    const itemIndex = Arr.findIndex(kin, (x) => {
        return item.id === x.id;
    });
    return itemIndex.bind((iIndex) => {
        return iIndex < kin.length - 1 ? Optional.some(kin[iIndex + 1]) : Optional.none();
    });
};
export { comparePosition, prevSibling, nextSibling };
//# sourceMappingURL=Query.js.map