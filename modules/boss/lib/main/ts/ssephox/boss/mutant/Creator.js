import { Optional } from '@ssephox/katamari';
import { Gene } from '../api/Gene';
import { TextGene } from '../api/TextGene';
const isNu = (item) => {
    return item.id === 'nu_' + item.name || Optional.from(item.text).exists((text) => item.id === '?_' + text);
};
const seed = () => {
    return {
        random: Math.random()
    };
};
const nu = (name) => {
    return {
        ...Gene('nu_' + name, name),
        ...seed()
    };
};
const clone = (item) => {
    return {
        ...item,
        children: [],
        id: 'clone**<' + item.id + '>'
    };
};
const text = (value) => {
    return {
        ...TextGene('?_' + value, value),
        ...seed()
    };
};
export { nu, clone, text, isNu };
//# sourceMappingURL=Creator.js.map