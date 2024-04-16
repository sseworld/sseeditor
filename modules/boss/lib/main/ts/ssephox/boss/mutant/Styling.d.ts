import { Optional } from '@ssephox/katamari';
import { Gene } from '../api/Gene';
declare const set: (item: Gene, property: string, value: string) => void;
declare const get: (item: Gene, property: string) => string;
declare const getRaw: (item: Gene, property: string) => Optional<string>;
declare const remove: (item: Gene, property: string) => void;
export { get, getRaw, set, remove };
//# sourceMappingURL=Styling.d.ts.map