import { Arr } from '@ssephox/katamari';
import * as Insert from './Insert';
const before = (marker, elements) => {
    Arr.each(elements, (x) => {
        Insert.before(marker, x);
    });
};
const after = (marker, elements) => {
    Arr.each(elements, (x, i) => {
        const e = i === 0 ? marker : elements[i - 1];
        Insert.after(e, x);
    });
};
const prepend = (parent, elements) => {
    Arr.each(elements.slice().reverse(), (x) => {
        Insert.prepend(parent, x);
    });
};
const append = (parent, elements) => {
    Arr.each(elements, (x) => {
        Insert.append(parent, x);
    });
};
export { before, after, prepend, append };
//# sourceMappingURL=InsertAll.js.map