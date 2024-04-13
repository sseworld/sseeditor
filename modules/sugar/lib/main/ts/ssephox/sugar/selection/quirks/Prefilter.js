"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessExact = exports.preprocessRelative = exports.preprocess = exports.beforeSpecial = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("../../api/node/SugarElement");
var SugarNode = require("../../api/node/SugarNode");
var SimSelection_1 = require("../../api/selection/SimSelection");
var Situ_1 = require("../../api/selection/Situ");
var beforeSpecial = function (element, offset) {
    // From memory, we don't want to use <br> directly on Firefox because it locks the keyboard input.
    // It turns out that <img> directly on IE locks the keyboard as well.
    // If the offset is 0, use before. If the offset is 1, use after.
    // TBIO-3889: Firefox Situ.on <input> results in a child of the <input>; Situ.before <input> results in platform inconsistencies
    var name = SugarNode.name(element);
    if ('input' === name) {
        return Situ_1.Situ.after(element);
    }
    else if (!katamari_1.Arr.contains(['br', 'img'], name)) {
        return Situ_1.Situ.on(element, offset);
    }
    else {
        return offset === 0 ? Situ_1.Situ.before(element) : Situ_1.Situ.after(element);
    }
};
exports.beforeSpecial = beforeSpecial;
var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold(Situ_1.Situ.before, beforeSpecial, Situ_1.Situ.after);
    var finish = finishSitu.fold(Situ_1.Situ.before, beforeSpecial, Situ_1.Situ.after);
    return SimSelection_1.SimSelection.relative(start, finish);
};
exports.preprocessRelative = preprocessRelative;
var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return SimSelection_1.SimSelection.relative(startSitu, finishSitu);
};
exports.preprocessExact = preprocessExact;
var preprocess = function (selection) { return selection.match({
    domRange: function (rng) {
        var start = SugarElement_1.SugarElement.fromDom(rng.startContainer);
        var finish = SugarElement_1.SugarElement.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
    },
    relative: preprocessRelative,
    exact: preprocessExact
}); };
exports.preprocess = preprocess;
//# sourceMappingURL=Prefilter.js.map