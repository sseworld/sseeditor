import { Optional } from '@ssephox/katamari';
import { EventHandler, EventUnbinder } from '../events/Types';
export interface Bounds {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly right: number;
    readonly bottom: number;
}
declare const get: (_win?: Window) => Optional<VisualViewport>;
declare const getBounds: (_win?: Window) => Bounds;
declare const bind: (name: string, callback: EventHandler, _win?: Window) => EventUnbinder;
export { bind, get, getBounds };
//# sourceMappingURL=WindowVisualViewport.d.ts.map