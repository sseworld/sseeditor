import { Optional } from '@ssephox/katamari';
const set = (item, property, value) => {
    item.css = {
        ...item.css,
        [property]: value
    };
};
const get = (item, property) => {
    return item.css !== undefined && item.css[property] !== undefined ? item.css[property] : '0';
};
const getRaw = (item, property) => {
    return item.css !== undefined && item.css[property] !== undefined ? Optional.some(item.css[property]) : Optional.none();
};
const remove = (item, property) => {
    const rest = { ...item.css };
    delete rest[property];
    item.css = rest;
};
export { get, getRaw, set, remove };
//# sourceMappingURL=Styling.js.map