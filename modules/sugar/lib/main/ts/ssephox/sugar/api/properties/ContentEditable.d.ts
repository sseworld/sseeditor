import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
declare const closest: (target: SugarElement<Node>) => Optional<SugarElement<HTMLElement>>;
declare const isEditable: (element: SugarElement<HTMLElement>, assumeEditable?: boolean) => boolean;
declare const getRaw: (element: SugarElement<HTMLElement>) => string;
declare const get: (element: SugarElement<HTMLElement>) => boolean;
declare const set: (element: SugarElement<HTMLElement>, editable: boolean) => void;
export { get, getRaw, closest, isEditable, set };
//# sourceMappingURL=ContentEditable.d.ts.map