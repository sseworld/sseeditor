"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimSelection = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("../node/SugarElement");
var Traverse = require("../search/Traverse");
var SimRange_1 = require("./SimRange");
var Situ_1 = require("./Situ");
// Consider adding a type for "element"
var adt = katamari_1.Adt.generate([
    { domRange: ['rng'] },
    { relative: ['startSitu', 'finishSitu'] },
    { exact: ['start', 'soffset', 'finish', 'foffset'] }
]);
var exactFromRange = function (simRange) {
    return adt.exact(simRange.start, simRange.soffset, simRange.finish, simRange.foffset);
};
var getStart = function (selection) {
    return selection.match({
        domRange: function (rng) { return SugarElement_1.SugarElement.fromDom(rng.startContainer); },
        relative: function (startSitu, _finishSitu) { return Situ_1.Situ.getStart(startSitu); },
        exact: function (start, _soffset, _finish, _foffset) { return start; }
    });
};
var domRange = adt.domRange;
var relative = adt.relative;
var exact = adt.exact;
var getWin = function (selection) {
    var start = getStart(selection);
    return Traverse.defaultView(start);
};
// This is out of place but it's API so I can't remove it
var range = SimRange_1.SimRange.create;
// tslint:disable-next-line:variable-name
exports.SimSelection = {
    domRange: domRange,
    relative: relative,
    exact: exact,
    exactFromRange: exactFromRange,
    getWin: getWin,
    range: range
};
//# sourceMappingURL=SimSelection.js.map