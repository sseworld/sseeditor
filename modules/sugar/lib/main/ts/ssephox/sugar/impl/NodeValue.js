import { Optional } from '@ssephox/katamari';
export const NodeValue = (is, name) => {
    const get = (element) => {
        if (!is(element)) {
            throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
        }
        return getOption(element).getOr('');
    };
    const getOption = (element) => is(element) ? Optional.from(element.dom.nodeValue) : Optional.none();
    const set = (element, value) => {
        if (!is(element)) {
            throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
        }
        element.dom.nodeValue = value;
    };
    return {
        get,
        getOption,
        set
    };
};
//# sourceMappingURL=NodeValue.js.map