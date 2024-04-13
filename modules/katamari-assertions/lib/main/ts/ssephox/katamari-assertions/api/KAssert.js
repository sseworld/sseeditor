"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eqError = exports.eqValue = exports.eqResult = exports.eqSome = exports.eqNone = exports.eqOptional = void 0;
var bedrock_client_1 = require("@ephox/bedrock-client");
var dispute_1 = require("@ephox/dispute");
var katamari_1 = require("@ssephox/katamari");
var tOptional = katamari_1.OptionalInstances.tOptional;
var tResult = katamari_1.ResultInstances.tResult;
var tAny = dispute_1.Testable.tAny;
// NOTE: Don't use this within Agar - use tOptional directly
var eqOptional = function (message, expected, actual, testableA) {
    if (testableA === void 0) { testableA = tAny; }
    return bedrock_client_1.Assert.eq(message, expected, actual, tOptional(testableA));
};
exports.eqOptional = eqOptional;
var eqNone = function (message, actual) {
    return (0, exports.eqOptional)(message, katamari_1.Optional.none(), actual, tAny);
};
exports.eqNone = eqNone;
var eqSome = function (message, expected, actual, testableA) {
    if (testableA === void 0) { testableA = tAny; }
    return (0, exports.eqOptional)(message, katamari_1.Optional.some(expected), actual, testableA);
};
exports.eqSome = eqSome;
var eqResult = function (message, expected, actual, testableA, testableE) {
    if (testableA === void 0) { testableA = tAny; }
    if (testableE === void 0) { testableE = tAny; }
    return bedrock_client_1.Assert.eq(message, expected, actual, tResult(testableA, testableE));
};
exports.eqResult = eqResult;
var eqValue = function (message, expected, actual, testableA, testableE) {
    if (testableA === void 0) { testableA = tAny; }
    if (testableE === void 0) { testableE = tAny; }
    return (0, exports.eqResult)(message, katamari_1.Result.value(expected), actual, testableA, testableE);
};
exports.eqValue = eqValue;
var eqError = function (message, expected, actual, testableA, testableE) {
    if (testableA === void 0) { testableA = tAny; }
    if (testableE === void 0) { testableE = tAny; }
    return (0, exports.eqResult)(message, katamari_1.Result.error(expected), actual, testableA, testableE);
};
exports.eqError = eqError;
//# sourceMappingURL=KAssert.js.map