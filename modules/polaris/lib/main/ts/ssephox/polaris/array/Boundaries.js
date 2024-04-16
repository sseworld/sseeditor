import { Arr, Fun } from '@ssephox/katamari';
const boundAt = (xs, left, right, comparator) => {
    const leftIndex = Arr.findIndex(xs, Fun.curry(comparator, left));
    const first = leftIndex.getOr(0);
    const rightIndex = Arr.findIndex(xs, Fun.curry(comparator, right));
    const last = rightIndex.map((rIndex) => {
        return rIndex + 1;
    }).getOr(xs.length);
    return xs.slice(first, last);
};
export { boundAt };
//# sourceMappingURL=Boundaries.js.map