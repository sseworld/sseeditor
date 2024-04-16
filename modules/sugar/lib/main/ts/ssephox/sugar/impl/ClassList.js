import { Arr } from '@ssephox/katamari';
import * as AttrList from '../api/properties/AttrList';
// IE11 Can return undefined for a classList on elements such as math, so we make sure it's not undefined before attempting to use it.
const supports = (element) => element.dom.classList !== undefined;
const get = (element) => AttrList.read(element, 'class');
const add = (element, clazz) => AttrList.add(element, 'class', clazz);
const remove = (element, clazz) => AttrList.remove(element, 'class', clazz);
const toggle = (element, clazz) => {
    if (Arr.contains(get(element), clazz)) {
        return remove(element, clazz);
    }
    else {
        return add(element, clazz);
    }
};
export { get, add, remove, toggle, supports };
//# sourceMappingURL=ClassList.js.map