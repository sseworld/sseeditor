import { Arr, Obj, Optional, Optionals, Strings, Type } from '@ssephox/katamari';
import * as Style from '../../impl/Style';
import * as SugarBody from '../node/SugarBody';
import { SugarElement } from '../node/SugarElement';
import * as SugarNode from '../node/SugarNode';
import * as Attribute from './Attribute';
const internalSet = (dom, property, value) => {
    // This is going to hurt. Apologies.
    // JQuery coerces numbers to pixels for certain property names, and other times lets numbers through.
    // we're going to be explicit; strings only.
    if (!Type.isString(value)) {
        // eslint-disable-next-line no-console
        console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
        throw new Error('CSS value must be a string: ' + value);
    }
    // removed: support for dom().style[property] where prop is camel case instead of normal property name
    if (Style.isSupported(dom)) {
        dom.style.setProperty(property, value);
    }
};
const internalRemove = (dom, property) => {
    /*
     * IE9 and above - MDN doesn't have details, but here's a couple of random internet claims
     *
     * http://help.dottoro.com/ljopsjck.php
     * http://stackoverflow.com/a/7901886/7546
     */
    if (Style.isSupported(dom)) {
        dom.style.removeProperty(property);
    }
};
const set = (element, property, value) => {
    const dom = element.dom;
    internalSet(dom, property, value);
};
const setAll = (element, css) => {
    const dom = element.dom;
    Obj.each(css, (v, k) => {
        internalSet(dom, k, v);
    });
};
const setOptions = (element, css) => {
    const dom = element.dom;
    Obj.each(css, (v, k) => {
        v.fold(() => {
            internalRemove(dom, k);
        }, (value) => {
            internalSet(dom, k, value);
        });
    });
};
/*
 * NOTE: For certain properties, this returns the "used value" which is subtly different to the "computed value" (despite calling getComputedStyle).
 * Blame CSS 2.0.
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
 */
const get = (element, property) => {
    const dom = element.dom;
    /*
     * IE9 and above per
     * https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle
     *
     * Not in numerosity, because it doesn't memoize and looking this up dynamically in performance critical code would be horrendous.
     *
     * JQuery has some magic here for IE popups, but we don't really need that.
     * It also uses element.ownerDocument.defaultView to handle iframes but that hasn't been required since FF 3.6.
     */
    const styles = window.getComputedStyle(dom);
    const r = styles.getPropertyValue(property);
    // jquery-ism: If r is an empty string, check that the element is not in a document. If it isn't, return the raw value.
    // Turns out we do this a lot.
    return (r === '' && !SugarBody.inBody(element)) ? getUnsafeProperty(dom, property) : r;
};
// removed: support for dom().style[property] where prop is camel case instead of normal property name
// empty string is what the browsers (IE11 and Chrome) return when the propertyValue doesn't exists.
const getUnsafeProperty = (dom, property) => Style.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
/*
 * Gets the raw value from the style attribute. Useful for retrieving "used values" from the DOM:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
 *
 * Returns NONE if the property isn't set, or the value is an empty string.
 */
const getRaw = (element, property) => {
    const dom = element.dom;
    const raw = getUnsafeProperty(dom, property);
    return Optional.from(raw).filter((r) => r.length > 0);
};
const getAllRaw = (element) => {
    const css = {};
    const dom = element.dom;
    if (Style.isSupported(dom)) {
        for (let i = 0; i < dom.style.length; i++) {
            const ruleName = dom.style.item(i);
            css[ruleName] = dom.style[ruleName];
        }
    }
    return css;
};
const isValidValue = (tag, property, value) => {
    const element = SugarElement.fromTag(tag);
    set(element, property, value);
    const style = getRaw(element, property);
    return style.isSome();
};
const remove = (element, property) => {
    const dom = element.dom;
    internalRemove(dom, property);
    if (Optionals.is(Attribute.getOpt(element, 'style').map(Strings.trim), '')) {
        // No more styles left, remove the style attribute as well
        Attribute.remove(element, 'style');
    }
};
const preserve = (element, f) => {
    const oldStyles = Attribute.get(element, 'style');
    const result = f(element);
    if (oldStyles === undefined) {
        Attribute.remove(element, 'style');
    }
    else {
        Attribute.set(element, 'style', oldStyles);
    }
    return result;
};
const copy = (source, target) => {
    const sourceDom = source.dom;
    const targetDom = target.dom;
    if (Style.isSupported(sourceDom) && Style.isSupported(targetDom)) {
        targetDom.style.cssText = sourceDom.style.cssText;
    }
};
/* NOTE: This function is here for the side effect it triggers.
The value itself is not used.
Be sure to not use the return value, and that it is not removed by a minifier.
 */
const reflow = (e) => e.dom.offsetWidth;
const transferOne = (source, destination, style) => {
    getRaw(source, style).each((value) => {
        // NOTE: We don't want to clobber any existing inline styles.
        if (getRaw(destination, style).isNone()) {
            set(destination, style, value);
        }
    });
};
const transfer = (source, destination, styles) => {
    if (!SugarNode.isElement(source) || !SugarNode.isElement(destination)) {
        return;
    }
    Arr.each(styles, (style) => {
        transferOne(source, destination, style);
    });
};
export { copy, set, preserve, setAll, setOptions, remove, get, getRaw, getAllRaw, isValidValue, reflow, transfer };
//# sourceMappingURL=Css.js.map