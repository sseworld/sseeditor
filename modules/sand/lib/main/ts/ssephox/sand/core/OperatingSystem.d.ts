import { UaInfo } from "../info/UaInfo";
export interface OperatingSystem extends UaInfo {
    readonly isWindows: () => boolean;
    readonly isiOS: () => boolean;
    readonly isAndroid: () => boolean;
    readonly isMacOS: () => boolean;
    readonly isLinux: () => boolean;
    readonly isSolaris: () => boolean;
    readonly isFreeBSD: () => boolean;
    readonly isChromeOS: () => boolean;
}
export declare const OperatingSystem: {
    unknown: () => OperatingSystem;
    nu: (info: UaInfo) => OperatingSystem;
    windows: () => string;
    ios: () => string;
    android: () => string;
    linux: () => string;
    macos: () => string;
    solaris: () => string;
    freebsd: () => string;
    chromeos: () => string;
};
//# sourceMappingURL=OperatingSystem.d.ts.map