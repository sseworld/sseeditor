import { UaInfo } from "../info/UaInfo";
export interface Browser extends UaInfo {
    readonly isEdge: () => boolean;
    readonly isChromium: () => boolean;
    readonly isIE: () => boolean;
    readonly isOpera: () => boolean;
    readonly isFirefox: () => boolean;
    readonly isSafari: () => boolean;
}
export declare const Browser: {
    unknown: () => Browser;
    nu: (info: UaInfo) => Browser;
    edge: () => string;
    chromium: () => string;
    ie: () => string;
    opera: () => string;
    firefox: () => string;
    safari: () => string;
};
//# sourceMappingURL=Browser.d.ts.map