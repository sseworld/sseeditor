"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = void 0;
var firstMatch = function (regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
        var x = regexes[i];
        if (x.test(s)) {
            return x;
        }
    }
    return undefined;
};
var find = function (regexes, agent) {
    var r = firstMatch(regexes, agent);
    if (!r) {
        return { major: 0, minor: 0 };
    }
    var group = function (i) {
        return Number(agent.replace(r, "$" + i));
    };
    return nu(group(1), group(2));
};
var detect = function (versionRegexes, agent) {
    var cleanedAgent = String(agent).toLowerCase();
    if (versionRegexes.length === 0) {
        return unknown();
    }
    return find(versionRegexes, cleanedAgent);
};
var unknown = function () {
    return nu(0, 0);
};
var nu = function (major, minor) {
    return { major: major, minor: minor };
};
exports.Version = {
    nu: nu,
    detect: detect,
    unknown: unknown,
};
//# sourceMappingURL=Version.js.map