"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = exports.reflow = exports.isValidValue = exports.getAllRaw = exports.getRaw = exports.get = exports.remove = exports.setOptions = exports.setAll = exports.preserve = exports.set = exports.copy = void 0;
var katamari_1 = require("@ssephox/katamari");
var Style = require("../../impl/Style");
var SugarBody = require("../node/SugarBody");
var SugarElement_1 = require("../node/SugarElement");
var SugarNode = require("../node/SugarNode");
var Attribute = require("./Attribute");
var internalSet = function (dom, property, value) {
    // This is going to hurt. Apologies.
    // JQuery coerces numbers to pixels for certain property names, and other times lets numbers through.
    // we're going to be explicit; strings only.
    if (!katamari_1.Type.isString(value)) {
        // eslint-disable-next-line no-console
        console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
        throw new Error('CSS value must be a string: ' + value);
    }
    // removed: support for dom().style[property] where prop is camel case instead of normal property name
    if (Style.isSupported(dom)) {
        dom.style.setProperty(property, value);
    }
};
var internalRemove = function (dom, property) {
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
var set = function (element, property, value) {
    var dom = element.dom;
    internalSet(dom, property, value);
};
exports.set = set;
var setAll = function (element, css) {
    var dom = element.dom;
    katamari_1.Obj.each(css, function (v, k) {
        internalSet(dom, k, v);
    });
};
exports.setAll = setAll;
var setOptions = function (element, css) {
    var dom = element.dom;
    katamari_1.Obj.each(css, function (v, k) {
        v.fold(function () {
            internalRemove(dom, k);
        }, function (value) {
            internalSet(dom, k, value);
        });
    });
};
exports.setOptions = setOptions;
/*
 * NOTE: For certain properties, this returns the "used value" which is subtly different to the "computed value" (despite calling getComputedStyle).
 * Blame CSS 2.0.
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
 */
var get = function (element, property) {
    var dom = element.dom;
    /*
     * IE9 and above per
     * https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle
     *
     * Not in numerosity, because it doesn't memoize and looking this up dynamically in performance critical code would be horrendous.
     *
     * JQuery has some magic here for IE popups, but we don't really need that.
     * It also uses element.ownerDocument.defaultView to handle iframes but that hasn't been required since FF 3.6.
     */
    var styles = window.getComputedStyle(dom);
    var r = styles.getPropertyValue(property);
    // jquery-ism: If r is an empty string, check that the element is not in a document. If it isn't, return the raw value.
    // Turns out we do this a lot.
    return (r === '' && !SugarBody.inBody(element)) ? getUnsafeProperty(dom, property) : r;
};
exports.get = get;
// removed: support for dom().style[property] where prop is camel case instead of normal property name
// empty string is what the browsers (IE11 and Chrome) return when the propertyValue doesn't exists.
var getUnsafeProperty = function (dom, property) {
    return Style.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
};
/*
 * Gets the raw value from the style attribute. Useful for retrieving "used values" from the DOM:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
 *
 * Returns NONE if the property isn't set, or the value is an empty string.
 */
var getRaw = function (element, property) {
    var dom = element.dom;
    var raw = getUnsafeProperty(dom, property);
    return katamari_1.Optional.from(raw).filter(function (r) { return r.length > 0; });
};
exports.getRaw = getRaw;
var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom;
    if (Style.isSupported(dom)) {
        for (var i = 0; i < dom.style.length; i++) {
            var ruleName = dom.style.item(i);
            css[ruleName] = dom.style[ruleName];
        }
    }
    return css;
};
exports.getAllRaw = getAllRaw;
var isValidValue = function (tag, property, value) {
    var element = SugarElement_1.SugarElement.fromTag(tag);
    set(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
};
exports.isValidValue = isValidValue;
var remove = function (element, property) {
    var dom = element.dom;
    internalRemove(dom, property);
    if (katamari_1.Optionals.is(Attribute.getOpt(element, 'style').map(katamari_1.Strings.trim), '')) {
        // No more styles left, remove the style attribute as well
        Attribute.remove(element, 'style');
    }
};
exports.remove = remove;
var preserve = function (element, f) {
    var oldStyles = Attribute.get(element, 'style');
    var result = f(element);
    if (oldStyles === undefined) {
        Attribute.remove(element, 'style');
    }
    else {
        Attribute.set(element, 'style', oldStyles);
    }
    return result;
};
exports.preserve = preserve;
var copy = function (source, target) {
    var sourceDom = source.dom;
    var targetDom = target.dom;
    if (Style.isSupported(sourceDom) && Style.isSupported(targetDom)) {
        targetDom.style.cssText = sourceDom.style.cssText;
    }
};
exports.copy = copy;
/* NOTE: This function is here for the side effect it triggers.
The value itself is not used.
Be sure to not use the return value, and that it is not removed by a minifier.
 */
var reflow = function (e) {
    return e.dom.offsetWidth;
};
exports.reflow = reflow;
var transferOne = function (source, destination, style) {
    getRaw(source, style).each(function (value) {
        // NOTE: We don't want to clobber any existing inline styles.
        if (getRaw(destination, style).isNone()) {
            set(destination, style, value);
        }
    });
};
var transfer = function (source, destination, styles) {
    if (!SugarNode.isElement(source) || !SugarNode.isElement(destination)) {
        return;
    }
    katamari_1.Arr.each(styles, function (style) {
        transferOne(source, destination, style);
    });
};
exports.transfer = transfer;
//# sourceMappingURL=Css.js.map