import { Arr } from "@ssephox/katamari";
import { Version } from "./Version";
const detect = (candidates, userAgent) => {
    const agent = String(userAgent).toLowerCase();
    return Arr.find(candidates, (candidate) => {
        return candidate.search(agent);
    });
};
// They (browser and os) are the same at the moment, but they might
// not stay that way.
const detectBrowser = (browsers, userAgent) => {
    return detect(browsers, userAgent).map((browser) => {
        const version = Version.detect(browser.versionRegexes, userAgent);
        return {
            current: browser.name,
            version,
        };
    });
};
const detectOs = (oses, userAgent) => {
    return detect(oses, userAgent).map((os) => {
        const version = Version.detect(os.versionRegexes, userAgent);
        return {
            current: os.name,
            version,
        };
    });
};
export { detectBrowser, detectOs };
//# sourceMappingURL=UaString.js.map