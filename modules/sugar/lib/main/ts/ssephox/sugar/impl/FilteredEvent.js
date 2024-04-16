import { Fun } from '@ssephox/katamari';
import { SugarElement } from '../api/node/SugarElement';
import * as SugarShadowDom from '../api/node/SugarShadowDom';
const mkEvent = (target, x, y, stop, prevent, kill, raw) => ({
    target,
    x,
    y,
    stop,
    prevent,
    kill,
    raw
});
/** Wraps an Event in an EventArgs structure.
 * The returned EventArgs structure has its target set to the "original" target if possible.
 * See SugarShadowDom.getOriginalEventTarget
 */
const fromRawEvent = (rawEvent) => {
    const target = SugarElement.fromDom(SugarShadowDom.getOriginalEventTarget(rawEvent).getOr(rawEvent.target));
    const stop = () => rawEvent.stopPropagation();
    const prevent = () => rawEvent.preventDefault();
    const kill = Fun.compose(prevent, stop); // more of a sequence than a compose, but same effect
    // FIX: Don't just expose the raw event. Need to identify what needs standardisation.
    return mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
};
const handle = (filter, handler) => (rawEvent) => {
    if (filter(rawEvent)) {
        handler(fromRawEvent(rawEvent));
    }
};
const binder = (element, event, filter, handler, useCapture) => {
    const wrapped = handle(filter, handler);
    // IE9 minimum
    element.dom.addEventListener(event, wrapped, useCapture);
    return {
        unbind: Fun.curry(unbind, element, event, wrapped, useCapture)
    };
};
const bind = (element, event, filter, handler) => binder(element, event, filter, handler, false);
const capture = (element, event, filter, handler) => binder(element, event, filter, handler, true);
const unbind = (element, event, handler, useCapture) => {
    // IE9 minimum
    element.dom.removeEventListener(event, handler, useCapture);
};
export { bind, capture, fromRawEvent };
//# sourceMappingURL=FilteredEvent.js.map