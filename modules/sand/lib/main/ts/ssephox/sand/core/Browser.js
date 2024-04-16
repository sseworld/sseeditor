import { Fun } from "@ssephox/katamari";
import { Version } from "../detect/Version";
const edge = "Edge";
const chromium = "Chromium";
const ie = "IE";
const opera = "Opera";
const firefox = "Firefox";
const safari = "Safari";
const unknown = () => {
    return nu({
        current: undefined,
        version: Version.unknown(),
    });
};
const nu = (info) => {
    const current = info.current;
    const version = info.version;
    const isBrowser = (name) => () => current === name;
    return {
        current,
        version,
        isEdge: isBrowser(edge),
        isChromium: isBrowser(chromium),
        // NOTE: isIe just looks too weird
        isIE: isBrowser(ie),
        isOpera: isBrowser(opera),
        isFirefox: isBrowser(firefox),
        isSafari: isBrowser(safari),
    };
};
export const Browser = {
    unknown,
    nu,
    edge: Fun.constant(edge),
    chromium: Fun.constant(chromium),
    ie: Fun.constant(ie),
    opera: Fun.constant(opera),
    firefox: Fun.constant(firefox),
    safari: Fun.constant(safari),
};
//# sourceMappingURL=Browser.js.map