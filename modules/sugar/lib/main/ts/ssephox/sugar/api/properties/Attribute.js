import { Arr, Obj, Optional, Type } from '@ssephox/katamari';
import * as SugarNode from '../node/SugarNode';
const rawSet = (dom, key, value) => {
    /*
     * JQuery coerced everything to a string, and silently did nothing on text node/null/undefined.
     *
     * We fail on those invalid cases, only allowing numbers and booleans.
     */
    if (Type.isString(value) || Type.isBoolean(value) || Type.isNumber(value)) {
        dom.setAttribute(key, value + '');
    }
    else {
        // eslint-disable-next-line no-console
        console.error('Invalid call to Attribute.set. Key ', key, ':: Value ', value, ':: Element ', dom);
        throw new Error('Attribute value was not simple');
    }
};
const set = (element, key, value) => {
    rawSet(element.dom, key, value);
};
const setAll = (element, attrs) => {
    const dom = element.dom;
    Obj.each(attrs, (v, k) => {
        rawSet(dom, k, v);
    });
};
const setOptions = (element, attrs) => {
    Obj.each(attrs, (v, k) => {
        v.fold(() => {
            remove(element, k);
        }, (value) => {
            rawSet(element.dom, k, value);
        });
    });
};
const get = (element, key) => {
    const v = element.dom.getAttribute(key);
    // undefined is the more appropriate value for JS, and this matches JQuery
    return v === null ? undefined : v;
};
const getOpt = (element, key) => Optional.from(get(element, key));
const has = (element, key) => {
    const dom = element.dom;
    // return false for non-element nodes, no point in throwing an error
    return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
};
const remove = (element, key) => {
    element.dom.removeAttribute(key);
};
const hasNone = (element) => {
    const attrs = element.dom.attributes;
    return attrs === undefined || attrs === null || attrs.length === 0;
};
const clone = (element) => Arr.foldl(element.dom.attributes, (acc, attr) => {
    acc[attr.name] = attr.value;
    return acc;
}, {});
const transferOne = (source, destination, attr) => {
    // NOTE: We don't want to clobber any existing attributes
    if (!has(destination, attr)) {
        getOpt(source, attr).each((srcValue) => set(destination, attr, srcValue));
    }
};
// Transfer attributes(attrs) from source to destination, unless they are already present
const transfer = (source, destination, attrs) => {
    if (!SugarNode.isElement(source) || !SugarNode.isElement(destination)) {
        return;
    }
    Arr.each(attrs, (attr) => {
        transferOne(source, destination, attr);
    });
};
export { clone, set, setAll, setOptions, get, getOpt, has, remove, hasNone, transfer };
//# sourceMappingURL=Attribute.js.map