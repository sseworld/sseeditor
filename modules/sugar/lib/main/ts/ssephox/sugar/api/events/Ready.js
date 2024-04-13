"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.image = exports.document = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("../node/SugarElement");
var DomEvent = require("./DomEvent");
var documentReady = function (f) {
    /*
     * We only use this in one place, so creating one listener per ready request is more optimal than managing
     * a single event with a queue of functions.
     */
    /* The general spec describes three states: loading, complete, and interactive.
     * https://html.spec.whatwg.org/multipage/dom.html#current-document-readiness
     *
     * loading: the document is not ready (still loading)
     * interactive: the document is ready, but sub-resources are still loading
     * complete: the document is completely ready.
     *
     * Note, IE and w3 schools talk about: uninitialized and loaded. We may have to handle them in the future.
     */
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        f();
    }
    else {
        // Note that this fires when DOM manipulation is allowed, but before all resources are
        // available. This is the best practice but might be a bit weird.
        var listener_1 = DomEvent.bind(SugarElement_1.SugarElement.fromDom(document), 'DOMContentLoaded', function () {
            f();
            listener_1.unbind();
        });
    }
};
exports.document = documentReady;
var image = function (image) { return new Promise(function (resolve, reject) {
    var loaded = function () {
        destroy();
        resolve(image);
    };
    var listeners = [
        DomEvent.bind(image, 'load', loaded),
        DomEvent.bind(image, 'error', function () {
            destroy();
            reject('Unable to load data from image: ' + image.dom.src);
        }),
    ];
    var destroy = function () { return katamari_1.Arr.each(listeners, function (l) { return l.unbind(); }); };
    if (image.dom.complete) {
        loaded();
    }
}); };
exports.image = image;
//# sourceMappingURL=Ready.js.map