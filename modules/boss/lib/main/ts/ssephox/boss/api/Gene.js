import { Optional } from '@ssephox/katamari';
export const Gene = (id, name, children = [], css = {}, attrs = {}, text) => {
    const parent = Optional.none();
    return {
        id,
        name,
        children,
        css,
        attrs,
        text,
        parent
    };
};
//# sourceMappingURL=Gene.js.map