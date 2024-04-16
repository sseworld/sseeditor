import { Arr, Optional } from '@ssephox/katamari';
import * as Detach from './Detach';
import * as Locator from './Locator';
import * as Up from './Up';
const before = (anchor, item) => {
    anchor.parent.each((parent) => {
        const index = Locator.indexIn(parent, anchor);
        const detached = Detach.detach(Up.top(anchor), item).getOr(item);
        detached.parent = Optional.some(parent);
        index.each((ind) => {
            parent.children = parent.children.slice(0, ind).concat([detached]).concat(parent.children.slice(ind));
        });
    });
};
const after = (anchor, item) => {
    anchor.parent.each((parent) => {
        const index = Locator.indexIn(parent, anchor);
        const detached = Detach.detach(Up.top(anchor), item).getOr(item);
        detached.parent = Optional.some(parent);
        index.each((ind) => {
            parent.children = parent.children.slice(0, ind + 1).concat([detached]).concat(parent.children.slice(ind + 1));
        });
    });
};
const append = (parent, item) => {
    const detached = Detach.detach(Up.top(parent), item).getOr(item);
    parent.children = parent.children || [];
    parent.children = parent.children.concat([detached]);
    detached.parent = Optional.some(parent);
};
const appendAll = (parent, items) => {
    Arr.map(items, (item) => {
        append(parent, item);
    });
};
const afterAll = (anchor, items) => {
    anchor.parent.each((parent) => {
        const index = Locator.indexIn(parent, anchor);
        const detached = Arr.map(items, (item) => {
            const ditem = Detach.detach(Up.top(anchor), item).getOr(item);
            ditem.parent = Optional.some(parent);
            return ditem;
        });
        index.each((ind) => {
            parent.children = parent.children.slice(0, ind + 1).concat(detached).concat(parent.children.slice(ind + 1));
        });
    });
};
const prepend = (parent, item) => {
    const detached = Detach.detach(Up.top(parent), item).getOr(item);
    parent.children = parent.children || [];
    parent.children = [detached].concat(parent.children);
    detached.parent = Optional.some(parent);
};
const wrap = (anchor, wrapper) => {
    // INVESTIGATE: At this stage, mutation is necessary to act like the DOM
    anchor.parent.each((parent) => {
        wrapper.parent = Optional.some(parent);
        parent.children = Arr.map(parent.children || [], (c) => {
            return c === anchor ? wrapper : c;
        });
        wrapper.children = [anchor];
        anchor.parent = Optional.some(wrapper);
    });
};
export { before, after, afterAll, append, appendAll, prepend, wrap };
//# sourceMappingURL=Insertion.js.map