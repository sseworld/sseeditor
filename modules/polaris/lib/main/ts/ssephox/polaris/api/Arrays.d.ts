import { Splitting } from './Splitting';
type BoundAtApi = <T, T2>(xs: T[], left: T2, right: T2, comparator: (a: T2, b: T) => boolean) => T[];
declare const boundAt: BoundAtApi;
type SplitByApi = <T>(xs: T[], pred: (x: T) => boolean) => T[][];
declare const splitby: SplitByApi;
type SplitByAdvApi = <T>(xs: T[], pred: (x: T) => Splitting<T>) => T[][];
declare const splitbyAdv: SplitByAdvApi;
type SliceByApi = <T>(list: T[], pred: (x: T, i: number) => boolean) => T[];
declare const sliceby: SliceByApi;
export { splitby, splitbyAdv, sliceby, boundAt };
//# sourceMappingURL=Arrays.d.ts.map