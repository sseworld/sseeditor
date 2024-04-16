import { Fun, Optional, Thunk } from '@ssephox/katamari';
import { PlatformDetection } from '../core/PlatformDetection';
const mediaMatch = (query) => window.matchMedia(query).matches;
// IMPORTANT: Must be in a thunk, otherwise rollup thinks calling this immediately
// causes side effects and won't tree shake this away
// Note: navigator.userAgentData is not part of the native typescript types yet
let platform = Thunk.cached(() => PlatformDetection.detect(navigator.userAgent, Optional.from((navigator.userAgentData)), mediaMatch));
export const detect = () => platform();
export const override = (overrides) => {
    platform = Fun.constant({
        ...detect(),
        ...overrides
    });
};
//# sourceMappingURL=PlatformDetection.js.map