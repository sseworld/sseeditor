import { Arr, Optional } from '@ssephox/katamari';
import * as Comparator from './Comparator';
import * as Creator from './Creator';
const byId = (item, id) => {
    if (id === undefined) {
        throw new Error('Id value not specified for byId');
    }
    if (item.id !== undefined && item.id === id) {
        return Optional.some(item);
    }
    else {
        return Arr.foldl(item.children || [], (b, a) => {
            return byId(a, id).or(b);
        }, Optional.none());
    }
};
const byItem = (item, target) => {
    const itemNu = Creator.isNu(item);
    const targetNu = Creator.isNu(target);
    const sameId = item.id !== undefined && item.id === target.id;
    if (sameId && !itemNu && !targetNu) {
        return Optional.some(item);
    }
    else if (sameId && itemNu && targetNu && item.random === target.random) {
        return Optional.some(item);
    }
    else {
        return Arr.foldl(item.children || [], (b, a) => {
            return byItem(a, target).or(b);
        }, Optional.none());
    }
};
const indexIn = (parent, item) => {
    return Arr.findIndex(parent.children, (x) => {
        return Comparator.eq(x, item);
    });
};
export { byId, byItem, indexIn };
//# sourceMappingURL=Locator.js.map