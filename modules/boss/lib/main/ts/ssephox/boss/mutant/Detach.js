import { Arr } from '@ssephox/katamari';
import * as Comparator from './Comparator';
import * as Locator from './Locator';
const detach = (root, target) => {
    return Locator.byItem(root, target).bind((item) => {
        return item.parent.bind((parent) => {
            const index = Arr.findIndex(parent.children || [], (child) => {
                return Comparator.eq(child, item);
            });
            return index.map((ind) => {
                parent.children = parent.children.slice(0, ind).concat(parent.children.slice(ind + 1));
                return item;
            });
        });
    });
};
export { detach };
//# sourceMappingURL=Detach.js.map