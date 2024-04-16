import { Arr, Optional } from '@ssephox/katamari';
import * as Comparator from './Comparator';
import * as Detach from './Detach';
import * as Up from './Up';
const unwrap = (item) => {
    item.parent.each((parent) => {
        const children = item.children;
        Arr.each(children, (child) => {
            child.parent = Optional.some(parent);
        });
        const index = Arr.findIndex(parent.children, (sibling) => {
            return Comparator.eq(sibling, item);
        });
        index.fold(() => {
            parent.children = parent.children.concat(children);
        }, (ind) => {
            parent.children = parent.children.slice(0, ind).concat(children).concat(parent.children.slice(ind + 1));
        });
    });
};
const remove = (item) => {
    detach(item);
};
const detach = (item) => {
    Detach.detach(Up.top(item), item);
};
export { unwrap, remove, detach };
//# sourceMappingURL=Removal.js.map