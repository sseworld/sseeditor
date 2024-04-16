import { Arr, Optional } from '@ssephox/katamari';
import { PRange } from '../pattern/Types';
type GenerateApi = <T, R extends {
    finish: number;
}>(xs: T[], f: (x: T, offset: number) => Optional<R>, start?: number) => R[];
declare const generate: GenerateApi;
type GetApi = <T extends PRange>(parray: T[], offset: number) => Optional<T>;
declare const get: GetApi;
type FindApi = typeof Arr.find;
declare const find: FindApi;
type SplitsApi = <T extends PRange>(parray: T[], positions: number[], subdivide: (unit: T, positions: number[]) => T[]) => T[];
declare const splits: SplitsApi;
type TranslateApi = <T extends PRange>(parray: T[], offset: number) => T[];
declare const translate: TranslateApi;
type SublistApi = <T extends PRange>(parray: T[], start: number, finish: number) => T[];
declare const sublist: SublistApi;
export { generate, get, find, splits, translate, sublist };
//# sourceMappingURL=PositionArray.d.ts.map