"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = exports.query = exports.begin = void 0;
var katamari_1 = require("@ssephox/katamari");
var Compare = require("../api/dom/Compare");
/*
  Used to monitor elements and ensure that only one monitor is running at a time per element. It also
  guarantees that the unbind function will be called when monitoring is ended.

  This list is shared across the entire page, so be wary of memory leaks when using it.
 */
var polls = [];
var poll = function (element, unbind) { return ({ element: element, unbind: unbind }); };
var findPoller = function (element) {
    return katamari_1.Arr.findIndex(polls, function (p) { return Compare.eq(p.element, element); }).getOr(-1);
};
var begin = function (element, f) {
    var index = findPoller(element);
    if (index === -1) {
        var unbind = f();
        polls.push(poll(element, unbind));
    }
};
exports.begin = begin;
var query = function (element) {
    // Used in tests to determine whether an element is still being monitored
    var index = findPoller(element);
    return index === -1 ? katamari_1.Optional.none() : katamari_1.Optional.some(polls[index]);
};
exports.query = query;
var end = function (element) {
    var index = findPoller(element);
    // This function is called speculatively, so just do nothing if there is no monitor for the element
    if (index === -1) {
        return;
    }
    var poller = polls[index];
    polls.splice(index, 1);
    poller.unbind();
};
exports.end = end;
//# sourceMappingURL=Monitors.js.map