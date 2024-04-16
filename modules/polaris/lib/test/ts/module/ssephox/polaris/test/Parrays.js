import { Arr, Optional } from '@ssephox/katamari';
import * as PositionArray from 'ssephox/polaris/api/PositionArray';
const generator = (item, start) => {
    return Optional.some({
        start,
        finish: start + item.length,
        item
    });
};
const make = (values) => PositionArray.generate(values, generator);
const dump = (parray) => {
    return Arr.map(parray, (unit) => {
        return unit.start + '->' + unit.finish + '@ ' + unit.item;
    });
};
export { make, dump };
//# sourceMappingURL=Parrays.js.map