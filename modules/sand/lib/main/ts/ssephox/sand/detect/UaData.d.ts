import { Optional } from "@ssephox/katamari";
import { PlatformInfo } from "../info/PlatformInfo";
import { UaInfo } from "../info/UaInfo";
export interface UserAgentDataBrand {
    readonly brand: string;
    readonly version: string;
}
export interface UserAgentData {
    readonly brands: UserAgentDataBrand[];
    readonly mobile: boolean;
}
declare const detectBrowser: (browsers: PlatformInfo[], userAgentData: UserAgentData) => Optional<UaInfo>;
export { detectBrowser };
//# sourceMappingURL=UaData.d.ts.map