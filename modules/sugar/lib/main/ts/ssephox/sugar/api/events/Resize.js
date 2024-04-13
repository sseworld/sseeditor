"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unbind = exports.bind = void 0;
var katamari_1 = require("@ssephox/katamari");
var Monitors = require("../../impl/Monitors");
var Compare = require("../dom/Compare");
var SugarElement_1 = require("../node/SugarElement");
var Height = require("../view/Height");
var Visibility = require("../view/Visibility");
var Width = require("../view/Width");
var DomEvent = require("./DomEvent");
var Viewable = require("./Viewable");
var elem = function (element) { return ({
    element: element,
    handlers: [],
    lastWidth: Width.get(element),
    lastHeight: Height.get(element)
}); };
var elems = [];
var findElem = function (element) { return katamari_1.Arr.findIndex(elems, function (el) { return Compare.eq(el.element, element); }).getOr(-1); };
var bind = function (element, handler) {
    var el = katamari_1.Arr.find(elems, function (elm) { return Compare.eq(elm.element, element); }).getOrThunk(function () {
        var newEl = elem(element);
        elems.push(newEl);
        return newEl;
    });
    el.handlers.push(handler);
    if (interval.isNone()) {
        start();
    }
    // Fire an update event for this element on every bind call.
    // This is really handy if the element is currently hidden, the resize event
    // will fire as soon as it becomes visible.
    setTimeout(function () {
        // Ensure we don't attempt to update something that is unbound in the 100ms since the bind call
        if (findElem(el.element) !== -1) {
            update(el);
        }
    }, 100);
};
exports.bind = bind;
var unbind = function (element, handler) {
    // remove any monitors on this element
    Monitors.end(element);
    var index = findElem(element);
    if (index === -1) {
        return;
    }
    var handlerIndex = katamari_1.Arr.indexOf(elems[index].handlers, handler);
    if (handlerIndex.isNone()) {
        return;
    }
    elems[index].handlers.splice(handlerIndex.getOr(0), 1);
    if (elems[index].handlers.length === 0) {
        elems.splice(index, 1);
    }
    if (elems.length === 0) {
        stop();
    }
};
exports.unbind = unbind;
var visibleUpdate = function (el) {
    var w = Width.get(el.element);
    var h = Height.get(el.element);
    if (w !== el.lastWidth || h !== el.lastHeight) {
        el.lastWidth = w;
        el.lastHeight = h;
        katamari_1.Arr.each(el.handlers, katamari_1.Fun.apply);
    }
};
var update = function (el) {
    var element = el.element;
    // if already visible, run the update
    if (Visibility.isVisible(element)) {
        visibleUpdate(el);
    }
    else {
        Monitors.begin(element, function () {
            // the monitor is "wait for viewable"
            return Viewable.onShow(element, function () {
                Monitors.end(element);
                visibleUpdate(el);
            });
        });
    }
};
// Don't use peanut Throttler, requestAnimationFrame is much much better than setTimeout for resize/scroll events:
// http://www.html5rocks.com/en/tutorials/speed/animations/
var throttle = false;
var runHandler = function () {
    throttle = false;
    // cancelAnimationFrame isn't stable yet, so we can't pass events to the callback (they would be out of date)
    katamari_1.Arr.each(elems, update);
};
var listener = function () {
    // cancelAnimationFrame isn't stable yet, so we just ignore all subsequent events until the next animation frame
    if (!throttle) {
        throttle = true;
        window.requestAnimationFrame(runHandler);
    }
};
var interval = katamari_1.Optional.none();
var start = function () {
    interval = katamari_1.Optional.some(DomEvent.bind(SugarElement_1.SugarElement.fromDom(window), 'resize', listener));
};
var stop = function () {
    interval.each(function (f) {
        f.unbind();
        interval = katamari_1.Optional.none();
    });
};
//# sourceMappingURL=Resize.js.map