"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatingSystem = void 0;
var katamari_1 = require("@ssephox/katamari");
var Version_1 = require("../detect/Version");
var windows = "Windows";
var ios = "iOS";
var android = "Android";
var linux = "Linux";
var macos = "macOS";
var solaris = "Solaris";
var freebsd = "FreeBSD";
var chromeos = "ChromeOS";
// Though there is a bit of dupe with this and Browser, trying to
// reuse code makes it much harder to follow and change.
var unknown = function () {
    return nu({
        current: undefined,
        version: Version_1.Version.unknown(),
    });
};
var nu = function (info) {
    var current = info.current;
    var version = info.version;
    var isOS = function (name) { return function () { return current === name; }; };
    return {
        current: current,
        version: version,
        isWindows: isOS(windows),
        // TODO: Fix capitalisation
        isiOS: isOS(ios),
        isAndroid: isOS(android),
        isMacOS: isOS(macos),
        isLinux: isOS(linux),
        isSolaris: isOS(solaris),
        isFreeBSD: isOS(freebsd),
        isChromeOS: isOS(chromeos),
    };
};
exports.OperatingSystem = {
    unknown: unknown,
    nu: nu,
    windows: katamari_1.Fun.constant(windows),
    ios: katamari_1.Fun.constant(ios),
    android: katamari_1.Fun.constant(android),
    linux: katamari_1.Fun.constant(linux),
    macos: katamari_1.Fun.constant(macos),
    solaris: katamari_1.Fun.constant(solaris),
    freebsd: katamari_1.Fun.constant(freebsd),
    chromeos: katamari_1.Fun.constant(chromeos),
};
//# sourceMappingURL=OperatingSystem.js.map