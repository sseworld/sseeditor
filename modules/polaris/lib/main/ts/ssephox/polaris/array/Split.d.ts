import { Splitting } from '../api/Splitting';
/**
 * Split an array into chunks matched by the predicate
 */
declare const splitby: <T>(xs: T[], pred: (x: T) => boolean) => T[][];
/**
 * Split an array into chunks matched by the predicate
 */
declare const splitbyAdv: <T>(xs: T[], pred: (x: T) => Splitting<T>) => T[][];
export { splitby, splitbyAdv };
//# sourceMappingURL=Split.d.ts.map