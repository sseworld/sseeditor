"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOpenShadowHost = exports.isClosedShadowRoot = exports.isOpenShadowRoot = exports.getOriginalEventTarget = exports.getShadowHost = exports.getShadowRoot = exports.isInShadowRoot = exports.getContentContainer = exports.getStyleContainer = exports.createElement = exports.getRootNode = exports.isSupported = exports.isShadowRoot = void 0;
var katamari_1 = require("@ssephox/katamari");
var Traverse = require("../search/Traverse");
var SugarElement_1 = require("./SugarElement");
var SugarHead = require("./SugarHead");
var SugarNode = require("./SugarNode");
/**
 * Is the element a ShadowRoot?
 *
 * Note: this is insufficient to test if any element is a shadow root, but it is sufficient to differentiate between
 * a Document and a ShadowRoot.
 */
var isShadowRoot = function (dos) {
    return SugarNode.isDocumentFragment(dos) && katamari_1.Type.isNonNullable(dos.dom.host);
};
exports.isShadowRoot = isShadowRoot;
/* eslint-disable @tinymce/no-implicit-dom-globals, @typescript-eslint/unbound-method */
var supported = katamari_1.Type.isFunction(Element.prototype.attachShadow) &&
    katamari_1.Type.isFunction(Node.prototype.getRootNode);
/* eslint-enable */
/**
 * Does the browser support shadow DOM?
 *
 * NOTE: Node.getRootNode() and Element.attachShadow don't exist on IE11 and pre-Chromium Edge.
 */
exports.isSupported = katamari_1.Fun.constant(supported);
exports.getRootNode = supported
    ? function (e) { return SugarElement_1.SugarElement.fromDom(e.dom.getRootNode()); }
    : Traverse.documentOrOwner;
/** Create an element, using the actual document. */
var createElement = function (dos, tag) {
    return SugarElement_1.SugarElement.fromTag(tag, Traverse.documentOrOwner(dos).dom);
};
exports.createElement = createElement;
/** Where style tags need to go. ShadowRoot or document head */
var getStyleContainer = function (dos) {
    return (0, exports.isShadowRoot)(dos) ? dos : SugarHead.getHead(Traverse.documentOrOwner(dos));
};
exports.getStyleContainer = getStyleContainer;
/** Where content needs to go. ShadowRoot or document body */
var getContentContainer = function (dos) {
    // Can't use SugarBody.body without causing a circular module reference (since SugarBody.inBody uses SugarShadowDom)
    return (0, exports.isShadowRoot)(dos) ? dos : SugarElement_1.SugarElement.fromDom(Traverse.documentOrOwner(dos).dom.body);
};
exports.getContentContainer = getContentContainer;
/** Is this element either a ShadowRoot or a descendent of a ShadowRoot. */
var isInShadowRoot = function (e) {
    return (0, exports.getShadowRoot)(e).isSome();
};
exports.isInShadowRoot = isInShadowRoot;
/** If this element is in a ShadowRoot, return it. */
var getShadowRoot = function (e) {
    var r = (0, exports.getRootNode)(e);
    return (0, exports.isShadowRoot)(r) ? katamari_1.Optional.some(r) : katamari_1.Optional.none();
};
exports.getShadowRoot = getShadowRoot;
/** Return the host of a ShadowRoot.
 *
 * This function will throw if Shadow DOM is unsupported in the browser, or if the host is null.
 * If you actually have a ShadowRoot, this shouldn't happen.
 */
var getShadowHost = function (e) {
    return SugarElement_1.SugarElement.fromDom(e.dom.host);
};
exports.getShadowHost = getShadowHost;
/**
 * When Events bubble up through a ShadowRoot, the browser changes the target to be the shadow host.
 * This function gets the "original" event target if possible.
 * This only works if the shadow tree is open - if the shadow tree is closed, event.target is returned.
 * See: https://developers.google.com/web/fundamentals/web-components/shadowdom#events
 */
var getOriginalEventTarget = function (event) {
    if ((0, exports.isSupported)() && katamari_1.Type.isNonNullable(event.target)) {
        var el = SugarElement_1.SugarElement.fromDom(event.target);
        if (SugarNode.isElement(el) && (0, exports.isOpenShadowHost)(el)) {
            // When target element is inside Shadow DOM we need to take first element from composedPath
            // otherwise we'll get Shadow Root parent, not actual target element.
            if (event.composed && event.composedPath) {
                var composedPath = event.composedPath();
                if (composedPath) {
                    return katamari_1.Arr.head(composedPath);
                }
            }
        }
    }
    return katamari_1.Optional.from(event.target);
};
exports.getOriginalEventTarget = getOriginalEventTarget;
var isOpenShadowRoot = function (sr) {
    return sr.dom.mode === 'open';
};
exports.isOpenShadowRoot = isOpenShadowRoot;
var isClosedShadowRoot = function (sr) {
    return sr.dom.mode === 'closed';
};
exports.isClosedShadowRoot = isClosedShadowRoot;
/** Return true if the element is a host of an open shadow root.
 *  Return false if the element is a host of a closed shadow root, or if the element is not a host.
 */
var isOpenShadowHost = function (element) {
    return katamari_1.Type.isNonNullable(element.dom.shadowRoot);
};
exports.isOpenShadowHost = isOpenShadowHost;
//# sourceMappingURL=SugarShadowDom.js.map