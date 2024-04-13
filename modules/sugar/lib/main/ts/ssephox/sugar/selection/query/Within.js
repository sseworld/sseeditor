"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("../../api/node/SugarElement");
var Node = require("../../api/node/SugarNode");
var SelectorFilter = require("../../api/search/SelectorFilter");
var Selectors = require("../../api/search/Selectors");
var NativeRange = require("../core/NativeRange");
var SelectionDirection = require("../core/SelectionDirection");
var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = NativeRange.create(win);
    var self = Selectors.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat(SelectorFilter.descendants(ancestor, selector));
    return katamari_1.Arr.filter(elements, function (elem) {
        // Mutate the selection to save creating new ranges each time
        NativeRange.selectNodeContentsUsing(innerRange, elem);
        return NativeRange.isWithin(outerRange, innerRange);
    });
};
var find = function (win, selection, selector) {
    // Reverse the selection if it is RTL when doing the comparison
    var outerRange = SelectionDirection.asLtrRange(win, selection);
    var ancestor = SugarElement_1.SugarElement.fromDom(outerRange.commonAncestorContainer);
    // Note, this might need to change when we have to start looking for non elements.
    return Node.isElement(ancestor) ?
        withinContainer(win, ancestor, outerRange, selector) : [];
};
exports.find = find;
//# sourceMappingURL=Within.js.map