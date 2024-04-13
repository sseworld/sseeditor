"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformInfo = void 0;
var katamari_1 = require("@ssephox/katamari");
var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
var checkContains = function (target) {
    return function (uastring) {
        return katamari_1.Strings.contains(uastring, target);
    };
};
var browsers = [
    // This is legacy Edge
    {
        name: "Edge",
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
            return (katamari_1.Strings.contains(uastring, "edge/") &&
                katamari_1.Strings.contains(uastring, "chrome") &&
                katamari_1.Strings.contains(uastring, "safari") &&
                katamari_1.Strings.contains(uastring, "applewebkit"));
        },
    },
    // This is Google Chrome and Chromium Edge
    {
        name: "Chromium",
        brand: "Chromium",
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, normalVersionRegex],
        search: function (uastring) {
            return (katamari_1.Strings.contains(uastring, "chrome") &&
                !katamari_1.Strings.contains(uastring, "chromeframe"));
        },
    },
    {
        name: "IE",
        versionRegexes: [
            /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
            /.*?rv:([0-9]+)\.([0-9]+).*/,
        ],
        search: function (uastring) {
            return (katamari_1.Strings.contains(uastring, "msie") ||
                katamari_1.Strings.contains(uastring, "trident"));
        },
    },
    // INVESTIGATE: Is this still the Opera user agent?
    {
        name: "Opera",
        versionRegexes: [normalVersionRegex, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search: checkContains("opera"),
    },
    {
        name: "Firefox",
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: checkContains("firefox"),
    },
    {
        name: "Safari",
        versionRegexes: [normalVersionRegex, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: function (uastring) {
            return ((katamari_1.Strings.contains(uastring, "safari") ||
                katamari_1.Strings.contains(uastring, "mobile/")) &&
                katamari_1.Strings.contains(uastring, "applewebkit"));
        },
    },
];
var oses = [
    {
        name: "Windows",
        search: checkContains("win"),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/],
    },
    {
        name: "iOS",
        search: function (uastring) {
            return (katamari_1.Strings.contains(uastring, "iphone") ||
                katamari_1.Strings.contains(uastring, "ipad"));
        },
        versionRegexes: [
            /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
            /.*cpu os ([0-9]+)_([0-9]+).*/,
            /.*cpu iphone os ([0-9]+)_([0-9]+).*/,
        ],
    },
    {
        name: "Android",
        search: checkContains("android"),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/],
    },
    {
        name: "macOS",
        search: checkContains("mac os x"),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/],
    },
    {
        name: "Linux",
        search: checkContains("linux"),
        versionRegexes: [],
    },
    { name: "Solaris", search: checkContains("sunos"), versionRegexes: [] },
    {
        name: "FreeBSD",
        search: checkContains("freebsd"),
        versionRegexes: [],
    },
    {
        name: "ChromeOS",
        search: checkContains("cros"),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/],
    },
];
exports.PlatformInfo = {
    browsers: katamari_1.Fun.constant(browsers),
    oses: katamari_1.Fun.constant(oses),
};
//# sourceMappingURL=PlatformInfo.js.map