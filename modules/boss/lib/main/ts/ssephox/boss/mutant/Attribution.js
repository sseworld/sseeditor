const set = (item, property, value) => {
    item.attrs = {
        ...item.attrs,
        [property]: String(value)
    };
};
const get = (item, property) => {
    return item.attrs[property];
};
const remove = (item, property) => {
    const rest = { ...item.attrs };
    delete rest[property];
    item.attrs = rest;
};
const copyTo = (source, destination) => {
    destination.attrs = {
        ...destination.attrs,
        ...source.attrs
    };
};
export { get, set, remove, copyTo };
//# sourceMappingURL=Attribution.js.map