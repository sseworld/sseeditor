import { Arr } from '@ssephox/katamari';
const basic = (item) => {
    return custom(item, (i) => {
        return i.id;
    });
};
const custom = (item, renderer) => {
    return item.children && item.children.length > 0 ?
        renderer(item) + '(' + Arr.map(item.children || [], (c) => {
            return custom(c, renderer);
        }).join(',') + ')'
        : renderer(item);
};
export { basic, custom };
//# sourceMappingURL=Logger.js.map