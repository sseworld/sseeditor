import { Optional } from "@ssephox/katamari";
import { PlatformInfo } from "../info/PlatformInfo";
import { UaInfo } from "../info/UaInfo";
declare const detectBrowser: (browsers: PlatformInfo[], userAgent: any) => Optional<UaInfo>;
declare const detectOs: (oses: PlatformInfo[], userAgent: any) => Optional<UaInfo>;
export { detectBrowser, detectOs };
//# sourceMappingURL=UaString.d.ts.map