import { Arr, Optional } from '@ssephox/katamari';
/**
 * Simple "is position within unit" utility function
 */
const inUnit = (unit, position) => {
    return position >= unit.start && position <= unit.finish;
};
/**
 * Finds the unit in the PositionArray that contains this offset (if there is one)
 */
const get = (parray, offset) => {
    return Arr.find(parray, (x) => {
        return inUnit(x, offset);
    });
};
const startindex = (parray, offset) => {
    return Arr.findIndex(parray, (unit) => {
        return unit.start === offset;
    });
};
const tryend = (parray, finish) => {
    const finishes = parray[parray.length - 1] && parray[parray.length - 1].finish === finish;
    return finishes ? parray.length + 1 : -1;
};
/**
 * Extracts the pieces of the PositionArray that are bounded *exactly* on the start and finish offsets
 */
const sublist = (parray, start, finish) => {
    const first = startindex(parray, start);
    const rawlast = startindex(parray, finish);
    return first.bind((fIndex) => {
        const last = rawlast.getOr(tryend(parray, finish));
        return last > -1 ? Optional.some(parray.slice(fIndex, last)) : Optional.none();
    }).getOr([]);
};
const find = Arr.find;
export { get, find, inUnit, sublist };
//# sourceMappingURL=Query.js.map