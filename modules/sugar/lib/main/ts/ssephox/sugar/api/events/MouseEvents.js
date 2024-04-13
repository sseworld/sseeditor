"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leftUp = exports.leftPressedOver = exports.leftDown = exports.realClick = void 0;
var FilteredEvent = require("../../impl/FilteredEvent");
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
var isLeftClick = function (raw) { return raw.button === 0; };
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
var isLeftButtonPressed = function (raw) {
    // Only added by Chrome/Firefox in June 2015.
    // This is only to fix a 1px bug (TBIO-2836) so return true if we're on an older browser
    if (raw.buttons === undefined) {
        return true;
    }
    // use bitwise & for optimal comparison
    // eslint-disable-next-line no-bitwise
    return (raw.buttons & 1) !== 0;
};
// Not 100% sure whether this works, so use with caution
var isRealClick = function (raw) {
    // standards, only gecko/webkit as of Sept 2015
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
    // fallback to yes because there's no other way to really know
    var isTrusted = raw.isTrusted !== undefined && raw.isTrusted !== true ? false : true;
    // Firefox non-standard property
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent#mozInputSource
    var firefoxRaw = raw;
    return (firefoxRaw.mozInputSource === 6 || firefoxRaw.mozInputSource === 0) ? false : isTrusted;
};
var filtered = function (event, filter) { return ({
    bind: function (element, f) {
        return FilteredEvent.bind(element, event, filter, f);
    }
}); };
var realClick = filtered('click', isRealClick);
exports.realClick = realClick;
var leftDown = filtered('mousedown', isLeftClick);
exports.leftDown = leftDown;
var leftPressedOver = filtered('mouseover', isLeftButtonPressed);
exports.leftPressedOver = leftPressedOver;
var leftUp = filtered('mouseup', isLeftClick);
exports.leftUp = leftUp;
//# sourceMappingURL=MouseEvents.js.map