"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBounds = exports.get = exports.bind = void 0;
var katamari_1 = require("@ssephox/katamari");
var sand_1 = require("@ssephox/sand");
var FilteredEvent_1 = require("../../impl/FilteredEvent");
var SugarElement_1 = require("../node/SugarElement");
var Scroll = require("./Scroll");
var get = function (_win) {
    var win = _win === undefined ? window : _win;
    if (sand_1.PlatformDetection.detect().browser.isFirefox()) {
        // TINY-7984: Firefox 91 is returning incorrect values for visualViewport.pageTop, so disable it for now
        return katamari_1.Optional.none();
    }
    else {
        return katamari_1.Optional.from(win.visualViewport);
    }
};
exports.get = get;
var bounds = function (x, y, width, height) { return ({
    x: x,
    y: y,
    width: width,
    height: height,
    right: x + width,
    bottom: y + height
}); };
var getBounds = function (_win) {
    var win = _win === undefined ? window : _win;
    var doc = win.document;
    var scroll = Scroll.get(SugarElement_1.SugarElement.fromDom(doc));
    return get(win).fold(function () {
        var html = win.document.documentElement;
        // Don't use window.innerWidth/innerHeight here, as we don't want to include scrollbars
        // since the right/bottom position is based on the edge of the scrollbar not the window
        var width = html.clientWidth;
        var height = html.clientHeight;
        return bounds(scroll.left, scroll.top, width, height);
    }, function (visualViewport) {
        // iOS doesn't update the pageTop/pageLeft when element.scrollIntoView() is called, so we need to fallback to the
        // scroll position which will always be less than the page top/left values when page top/left are accurate/correct.
        return bounds(Math.max(visualViewport.pageLeft, scroll.left), Math.max(visualViewport.pageTop, scroll.top), visualViewport.width, visualViewport.height);
    });
};
exports.getBounds = getBounds;
var bind = function (name, callback, _win) {
    return get(_win).map(function (visualViewport) {
        var handler = function (e) { return callback((0, FilteredEvent_1.fromRawEvent)(e)); };
        visualViewport.addEventListener(name, handler);
        return {
            unbind: function () { return visualViewport.removeEventListener(name, handler); }
        };
    }).getOrThunk(function () { return ({
        unbind: katamari_1.Fun.noop
    }); });
};
exports.bind = bind;
//# sourceMappingURL=WindowVisualViewport.js.map