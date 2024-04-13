import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
declare const set: (element: SugarElement<Element>, key: string, value: string | boolean | number) => void;
declare const setAll: (element: SugarElement<Element>, attrs: Record<string, string | boolean | number>) => void;
declare const setOptions: (element: SugarElement<Element>, attrs: Record<string, Optional<string | boolean | number>>) => void;
declare const get: (element: SugarElement<Element>, key: string) => undefined | string;
declare const getOpt: (element: SugarElement<Element>, key: string) => Optional<string>;
declare const has: (element: SugarElement<Node>, key: string) => boolean;
declare const remove: (element: SugarElement<Element>, key: string) => void;
declare const hasNone: (element: SugarElement<Node>) => boolean;
declare const clone: (element: SugarElement<Element>) => Record<string, string>;
declare const transfer: (source: SugarElement<Element>, destination: SugarElement<Element>, attrs: string[]) => void;
export { clone, set, setAll, setOptions, get, getOpt, has, remove, hasNone, transfer };
//# sourceMappingURL=Attribute.d.ts.map