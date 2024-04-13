"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.getOption = exports.get = void 0;
var NodeValue_1 = require("../../impl/NodeValue");
var SugarNode = require("./SugarNode");
var api = (0, NodeValue_1.NodeValue)(SugarNode.isText, 'text');
var get = function (element) {
    return api.get(element);
};
exports.get = get;
var getOption = function (element) {
    return api.getOption(element);
};
exports.getOption = getOption;
var set = function (element, value) {
    return api.set(element, value);
};
exports.set = set;
//# sourceMappingURL=SugarText.js.map