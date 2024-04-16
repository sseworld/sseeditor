import { Arr } from '@ssephox/katamari';
import * as Query from './Query';
import * as Translate from './Translate';
/**
 * After subdivide has split the unit, update the resulting PositionArray based on the unit start position.
 */
const divide = (unit, positions, subdivide) => {
    const mini = subdivide(unit, positions);
    return Translate.translate(mini, unit.start);
};
/**
 * Adds extra split points into a PositionArray, using subdivide to split if necessary
 */
const splits = (parray, positions, subdivide) => {
    if (positions.length === 0) {
        return parray;
    }
    return Arr.bind(parray, (unit) => {
        const relevant = Arr.bind(positions, (pos) => {
            return Query.inUnit(unit, pos) ? [pos - unit.start] : [];
        });
        return relevant.length > 0 ? divide(unit, relevant, subdivide) : [unit];
    });
};
export { splits };
//# sourceMappingURL=Split.js.map