import { Gene } from '../api/Gene';
declare const set: (item: Gene, property: string, value: string | number | boolean) => void;
declare const get: (item: Gene, property: string) => string;
declare const remove: (item: Gene, property: string) => void;
declare const copyTo: (source: Gene, destination: Gene) => void;
export { get, set, remove, copyTo };
//# sourceMappingURL=Attribution.d.ts.map