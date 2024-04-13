"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromRawEvent = exports.capture = exports.bind = void 0;
var katamari_1 = require("@ssephox/katamari");
var FilteredEvent = require("../../impl/FilteredEvent");
var filter = katamari_1.Fun.always; // no filter on plain DomEvents
var bind = function (element, event, handler) {
    return FilteredEvent.bind(element, event, filter, handler);
};
exports.bind = bind;
var capture = function (element, event, handler) {
    return FilteredEvent.capture(element, event, filter, handler);
};
exports.capture = capture;
var fromRawEvent = FilteredEvent.fromRawEvent;
exports.fromRawEvent = fromRawEvent;
//# sourceMappingURL=DomEvent.js.map