import { DeviceType } from "../detect/DeviceType";
import * as UaData from "../detect/UaData";
import * as UaString from "../detect/UaString";
import { PlatformInfo } from "../info/PlatformInfo";
import { Browser } from "./Browser";
import { OperatingSystem } from "./OperatingSystem";
const detect = (userAgent, userAgentDataOpt, mediaMatch) => {
    const browsers = PlatformInfo.browsers();
    const oses = PlatformInfo.oses();
    const browser = userAgentDataOpt
        .bind((userAgentData) => UaData.detectBrowser(browsers, userAgentData))
        .orThunk(() => UaString.detectBrowser(browsers, userAgent))
        .fold(Browser.unknown, Browser.nu);
    const os = UaString.detectOs(oses, userAgent).fold(OperatingSystem.unknown, OperatingSystem.nu);
    const deviceType = DeviceType(os, browser, userAgent, mediaMatch);
    return {
        browser,
        os,
        deviceType,
    };
};
export const PlatformDetection = {
    detect,
};
//# sourceMappingURL=PlatformDetection.js.map