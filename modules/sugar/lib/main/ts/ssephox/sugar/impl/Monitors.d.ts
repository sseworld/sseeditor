import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../api/node/SugarElement';
export interface Polling {
    element: SugarElement<Node>;
    unbind: () => void;
}
declare const begin: (element: SugarElement<Node>, f: () => (() => void)) => void;
declare const query: (element: SugarElement<Node>) => Optional<Polling>;
declare const end: (element: SugarElement<Node>) => void;
export { begin, query, end };
//# sourceMappingURL=Monitors.d.ts.map