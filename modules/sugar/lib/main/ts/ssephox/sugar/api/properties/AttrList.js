import { Arr } from '@ssephox/katamari';
import * as Attribute from './Attribute';
// Methods for handling attributes that contain a list of values <div foo="alpha beta theta">
const read = (element, attr) => {
    const value = Attribute.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
};
const add = (element, attr, id) => {
    const old = read(element, attr);
    const nu = old.concat([id]);
    Attribute.set(element, attr, nu.join(' '));
    return true;
};
const remove = (element, attr, id) => {
    const nu = Arr.filter(read(element, attr), (v) => v !== id);
    if (nu.length > 0) {
        Attribute.set(element, attr, nu.join(' '));
    }
    else {
        Attribute.remove(element, attr);
    }
    return false;
};
export { read, add, remove };
//# sourceMappingURL=AttrList.js.map