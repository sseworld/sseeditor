"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isName = exports.checkList = exports.checkOpt = void 0;
var bedrock_client_1 = require("@ephox/bedrock-client");
var dispute_1 = require("@ephox/dispute");
var katamari_assertions_1 = require("@ssephox/katamari-assertions");
var SugarElementInstances_1 = require("ssephox/sugar/api/node/SugarElementInstances");
var SugarNode = require("ssephox/sugar/api/node/SugarNode");
var tArray = dispute_1.Testable.tArray;
var checkOpt = function (expected, actual) {
    katamari_assertions_1.KAssert.eqOptional('eq', expected, actual, (0, SugarElementInstances_1.tElement)());
};
exports.checkOpt = checkOpt;
var checkList = function (expected, actual) {
    bedrock_client_1.Assert.eq('eq', expected, actual, tArray((0, SugarElementInstances_1.tElement)()));
};
exports.checkList = checkList;
var isName = function (name) { return function (x) {
    return SugarNode.name(x) === name;
}; };
exports.isName = isName;
//# sourceMappingURL=Checkers.js.map