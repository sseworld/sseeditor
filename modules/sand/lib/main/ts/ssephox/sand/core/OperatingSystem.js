import { Fun } from "@ssephox/katamari";
import { Version } from "../detect/Version";
const windows = "Windows";
const ios = "iOS";
const android = "Android";
const linux = "Linux";
const macos = "macOS";
const solaris = "Solaris";
const freebsd = "FreeBSD";
const chromeos = "ChromeOS";
// Though there is a bit of dupe with this and Browser, trying to
// reuse code makes it much harder to follow and change.
const unknown = () => {
    return nu({
        current: undefined,
        version: Version.unknown(),
    });
};
const nu = (info) => {
    const current = info.current;
    const version = info.version;
    const isOS = (name) => () => current === name;
    return {
        current,
        version,
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
export const OperatingSystem = {
    unknown,
    nu,
    windows: Fun.constant(windows),
    ios: Fun.constant(ios),
    android: Fun.constant(android),
    linux: Fun.constant(linux),
    macos: Fun.constant(macos),
    solaris: Fun.constant(solaris),
    freebsd: Fun.constant(freebsd),
    chromeos: Fun.constant(chromeos),
};
//# sourceMappingURL=OperatingSystem.js.map