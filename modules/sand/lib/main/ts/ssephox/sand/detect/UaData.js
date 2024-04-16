import { Arr } from "@ssephox/katamari";
import { Version } from "./Version";
const detectBrowser = (browsers, userAgentData) => {
    return Arr.findMap(userAgentData.brands, (uaBrand) => {
        const lcBrand = uaBrand.brand.toLowerCase();
        return Arr.find(browsers, (browser) => { var _a; return lcBrand === ((_a = browser.brand) === null || _a === void 0 ? void 0 : _a.toLowerCase()); }).map((info) => ({
            current: info.name,
            version: Version.nu(parseInt(uaBrand.version, 10), 0),
        }));
    });
};
export { detectBrowser };
//# sourceMappingURL=UaData.js.map