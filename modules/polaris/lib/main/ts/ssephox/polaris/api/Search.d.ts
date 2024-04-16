import { PRange, PRegExp } from '../pattern/Types';
type FindallApi = (input: string, pattern: PRegExp) => PRange[];
declare const findall: FindallApi;
type FindmanyApi = <T extends {
    pattern: PRegExp;
}>(text: string, targets: T[]) => Array<T & PRange>;
declare const findmany: FindmanyApi;
export { findall, findmany };
//# sourceMappingURL=Search.d.ts.map