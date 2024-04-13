"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitFor = exports.cWaitFor = void 0;
var katamari_1 = require("@ssephox/katamari");
var DomEvent = require("../events/DomEvent");
var w = function (fType, element, eventType, timeout) { return fType(function (callback) {
    var listener = DomEvent.bind(element, eventType, function (event) {
        clearTimeout(time);
        listener.unbind();
        callback(katamari_1.Result.value(event));
    });
    var time = setTimeout(function () {
        listener.unbind();
        callback(katamari_1.Result.error('Event ' + eventType + ' did not fire within ' + timeout + 'ms'));
    }, timeout);
}); };
var cWaitFor = function (element, eventType, timeout) {
    return w(katamari_1.LazyValue.nu, element, eventType, timeout);
};
exports.cWaitFor = cWaitFor;
var waitFor = function (element, eventType, timeout) {
    return w(katamari_1.Future.nu, element, eventType, timeout);
};
exports.waitFor = waitFor;
//# sourceMappingURL=DomFuture.js.map