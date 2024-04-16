// tslint:disable-next-line:variable-name
export const Custom = (regex, prefix, suffix, flags) => {
    const term = () => {
        return new RegExp(regex, flags.getOr('g'));
    };
    return {
        term,
        prefix,
        suffix
    };
};
//# sourceMappingURL=Custom.js.map