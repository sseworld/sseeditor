import { Arr } from '@ssephox/katamari';
/**
 * Slice an array at the first item matched by the predicate
 */
const sliceby = (list, pred) => {
    const index = Arr.findIndex(list, pred).getOr(-1);
    return list.slice(0, index);
};
export { sliceby };
//# sourceMappingURL=Slice.js.map