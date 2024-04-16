import { PRange } from '../pattern/Types';
/**
 * Adds extra split points into a PositionArray, using subdivide to split if necessary
 */
declare const splits: <T extends PRange>(parray: T[], positions: number[], subdivide: (unit: T, positions: number[]) => T[]) => T[];
export { splits };
//# sourceMappingURL=Split.d.ts.map