import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
declare const set: (element: SugarElement<Node>, property: string, value: string) => void;
declare const setAll: (element: SugarElement<Node>, css: Record<string, string>) => void;
declare const setOptions: (element: SugarElement<Node>, css: Record<string, Optional<string>>) => void;
declare const get: (element: SugarElement<Element>, property: string) => string;
declare const getRaw: (element: SugarElement<Node>, property: string) => Optional<string>;
declare const getAllRaw: (element: SugarElement<Node>) => Record<string, string>;
declare const isValidValue: (tag: string, property: string, value: string) => boolean;
declare const remove: (element: SugarElement<Node>, property: string) => void;
declare const preserve: <E extends Element, T>(element: SugarElement<E>, f: (e: SugarElement<E>) => T) => T;
declare const copy: (source: SugarElement<Node>, target: SugarElement<HTMLElement>) => void;
declare const reflow: (e: SugarElement<HTMLElement>) => void;
declare const transfer: (source: SugarElement<Node>, destination: SugarElement<Node>, styles: string[]) => void;
export { copy, set, preserve, setAll, setOptions, remove, get, getRaw, getAllRaw, isValidValue, reflow, transfer };
//# sourceMappingURL=Css.d.ts.map