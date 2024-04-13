"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tElement = exports.pprintElement = exports.eqElement = void 0;
var dispute_1 = require("@ephox/dispute");
var Html = require("../properties/Html");
var eqElement = function () {
    return dispute_1.Eq.contramap(dispute_1.Eq.tripleEq, function (e) { return e.dom; });
};
exports.eqElement = eqElement;
var pprintElement = function () {
    return dispute_1.Pprint.pprint(function (e) { return dispute_1.Pnode.single(Html.getOuter(e)); });
};
exports.pprintElement = pprintElement;
var tElement = function () {
    return dispute_1.Testable.testable((0, exports.eqElement)(), (0, exports.pprintElement)());
};
exports.tElement = tElement;
//# sourceMappingURL=SugarElementInstances.js.map