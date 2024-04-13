"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onShow = void 0;
var katamari_1 = require("@ssephox/katamari");
var Traverse = require("../search/Traverse");
var Visibility = require("../view/Visibility");
/*
 * Long term it's probably worth looking at using a single event per page the way Resize does.
 * This could get a bit slow with a lot of editors in a heavy page.
 *
 * It's a bit harder to manage, though, because visibility is a one-shot listener.
 */
var poll = function (element, f) {
    var poller = setInterval(f, 500);
    return function () { return clearInterval(poller); };
};
var mutate = function (element, f) {
    var observer = new window.MutationObserver(f);
    var unbindMutate = function () { return observer.disconnect(); };
    // childList is super expensive, but required on Safari where the iframe has no width or height immediately.
    // If it becomes a performance issue, we can make childList === isSafari but thus far Sugar has no platform detection so that would be a sad day.
    observer.observe(Traverse.owner(element).dom, { attributes: true, subtree: true, childList: true, attributeFilter: ['style', 'class'] });
    return unbindMutate;
};
// IE11 and above, not using numerosity so we can poll on IE10
var wait = window.MutationObserver !== undefined && window.MutationObserver !== null ? mutate : poll;
var onShow = function (element, f) {
    if (Visibility.isVisible(element)) {
        window.requestAnimationFrame(f);
        return katamari_1.Fun.noop;
    }
    else {
        // these events might come in thick and fast, so throttle them
        var throttler = katamari_1.Throttler.adaptable(function () {
            if (Visibility.isVisible(element)) {
                unbind_1();
                window.requestAnimationFrame(f);
            }
        }, 100);
        var unbind_1 = wait(element, throttler.throttle);
        return unbind_1;
    }
};
exports.onShow = onShow;
//# sourceMappingURL=Viewable.js.map