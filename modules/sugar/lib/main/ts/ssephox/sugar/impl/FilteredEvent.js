"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromRawEvent = exports.capture = exports.bind = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("../api/node/SugarElement");
var SugarShadowDom = require("../api/node/SugarShadowDom");
var mkEvent = function (target, x, y, stop, prevent, kill, raw) { return ({
    target: target,
    x: x,
    y: y,
    stop: stop,
    prevent: prevent,
    kill: kill,
    raw: raw
}); };
/** Wraps an Event in an EventArgs structure.
 * The returned EventArgs structure has its target set to the "original" target if possible.
 * See SugarShadowDom.getOriginalEventTarget
 */
var fromRawEvent = function (rawEvent) {
    var target = SugarElement_1.SugarElement.fromDom(SugarShadowDom.getOriginalEventTarget(rawEvent).getOr(rawEvent.target));
    var stop = function () { return rawEvent.stopPropagation(); };
    var prevent = function () { return rawEvent.preventDefault(); };
    var kill = katamari_1.Fun.compose(prevent, stop); // more of a sequence than a compose, but same effect
    // FIX: Don't just expose the raw event. Need to identify what needs standardisation.
    return mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
};
exports.fromRawEvent = fromRawEvent;
var handle = function (filter, handler) { return function (rawEvent) {
    if (filter(rawEvent)) {
        handler(fromRawEvent(rawEvent));
    }
}; };
var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    // IE9 minimum
    element.dom.addEventListener(event, wrapped, useCapture);
    return {
        unbind: katamari_1.Fun.curry(unbind, element, event, wrapped, useCapture)
    };
};
var bind = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, false);
};
exports.bind = bind;
var capture = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, true);
};
exports.capture = capture;
var unbind = function (element, event, handler, useCapture) {
    // IE9 minimum
    element.dom.removeEventListener(event, handler, useCapture);
};
//# sourceMappingURL=FilteredEvent.js.map