import { Arr, Fun } from '@ssephox/katamari';
/**
 * Generate a PositionArray
 *
 * xs:     list of thing
 * f:      thing -> Optional unit
 * start: sets the start position to search at
 */
const make = (xs, f, start = 0) => {
    const init = {
        len: start,
        list: []
    };
    const r = Arr.foldl(xs, (acc, item) => {
        const value = f(item, acc.len);
        return value.fold(Fun.constant(acc), (v) => {
            return {
                len: v.finish,
                list: acc.list.concat([v])
            };
        });
    }, init);
    return r.list;
};
export { make };
//# sourceMappingURL=Generator.js.map