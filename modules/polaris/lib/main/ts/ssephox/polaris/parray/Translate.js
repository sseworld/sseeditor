import { Arr } from '@ssephox/katamari';
/** Adjust a PositionArray positions by an offset */
const translate = (parray, offset) => {
    return Arr.map(parray, (unit) => {
        return {
            ...unit,
            start: unit.start + offset,
            finish: unit.finish + offset
        };
    });
};
export { translate };
//# sourceMappingURL=Translate.js.map