import { Optional } from "@ssephox/katamari";
import { DeviceType } from "../detect/DeviceType";
import * as UaData from "../detect/UaData";
import { Browser } from "./Browser";
import { OperatingSystem } from "./OperatingSystem";
export interface PlatformDetection {
    readonly browser: Browser;
    readonly os: OperatingSystem;
    readonly deviceType: DeviceType;
}
export declare const PlatformDetection: {
    detect: (userAgent: string, userAgentDataOpt: Optional<UaData.UserAgentData>, mediaMatch: (query: string) => boolean) => PlatformDetection;
};
//# sourceMappingURL=PlatformDetection.d.ts.map