import { Browser } from "../core/Browser";
import { OperatingSystem } from "../core/OperatingSystem";
export interface DeviceType {
    readonly isiPad: () => boolean;
    readonly isiPhone: () => boolean;
    readonly isTablet: () => boolean;
    readonly isPhone: () => boolean;
    readonly isTouch: () => boolean;
    readonly isAndroid: () => boolean;
    readonly isiOS: () => boolean;
    readonly isWebView: () => boolean;
    readonly isDesktop: () => boolean;
}
export declare const DeviceType: (os: OperatingSystem, browser: Browser, userAgent: string, mediaMatch: (query: string) => boolean) => DeviceType;
//# sourceMappingURL=DeviceType.d.ts.map