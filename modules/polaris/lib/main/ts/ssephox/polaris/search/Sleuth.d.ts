import { PRange, PRegExp } from '../pattern/Types';
/**
 * For each target (pattern, ....), find the matching text (if there is any) and record the start and end offsets.
 *
 * Then sort by start point and remove overlapping result.
 */
declare const search: <T extends {
    pattern: PRegExp;
}>(text: string, targets: T[]) => Array<T & PRange>;
export { search };
//# sourceMappingURL=Sleuth.d.ts.map