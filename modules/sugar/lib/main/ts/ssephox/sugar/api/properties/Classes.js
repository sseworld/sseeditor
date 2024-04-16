import { Arr } from '@ssephox/katamari';
import * as ClassList from '../../impl/ClassList';
import * as Class from './Class';
/*
 * ClassList is IE10 minimum:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element.classList
 */
const add = (element, classes) => {
    Arr.each(classes, (x) => {
        Class.add(element, x);
    });
};
const remove = (element, classes) => {
    Arr.each(classes, (x) => {
        Class.remove(element, x);
    });
};
const toggle = (element, classes) => {
    Arr.each(classes, (x) => {
        Class.toggle(element, x);
    });
};
const hasAll = (element, classes) => Arr.forall(classes, (clazz) => Class.has(element, clazz));
const hasAny = (element, classes) => Arr.exists(classes, (clazz) => Class.has(element, clazz));
const getNative = (element) => {
    const classList = element.dom.classList;
    const r = new Array(classList.length);
    for (let i = 0; i < classList.length; i++) {
        const item = classList.item(i);
        if (item !== null) {
            r[i] = item;
        }
    }
    return r;
};
const get = (element) => ClassList.supports(element) ? getNative(element) : ClassList.get(element);
export { add, remove, toggle, hasAll, hasAny, get };
//# sourceMappingURL=Classes.js.map