import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../api/node/SugarElement';
export interface NodeValue {
    readonly get: (element: SugarElement<Node>) => string;
    readonly getOption: (element: SugarElement<Node>) => Optional<string>;
    readonly set: (element: SugarElement<Node>, value: string) => void;
}
export declare const NodeValue: (is: (e: SugarElement<Node>) => boolean, name: string) => NodeValue;
//# sourceMappingURL=NodeValue.d.ts.map