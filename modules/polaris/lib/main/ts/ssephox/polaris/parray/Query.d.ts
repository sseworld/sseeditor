import { Optional } from '@ssephox/katamari';
import { PRange } from '../pattern/Types';
/**
 * Simple "is position within unit" utility function
 */
declare const inUnit: (unit: PRange, position: number) => boolean;
/**
 * Finds the unit in the PositionArray that contains this offset (if there is one)
 */
declare const get: <T extends PRange>(parray: T[], offset: number) => Optional<T>;
/**
 * Extracts the pieces of the PositionArray that are bounded *exactly* on the start and finish offsets
 */
declare const sublist: <T extends PRange>(parray: T[], start: number, finish: number) => T[];
declare const find: {
    <T, U extends T>(xs: ArrayLike<T>, pred: (x: T, i: number) => x is U): Optional<U>;
    <T_1 = any>(xs: ArrayLike<T_1>, pred: (x: T_1, i: number) => boolean): Optional<T_1>;
};
export { get, find, inUnit, sublist };
//# sourceMappingURL=Query.d.ts.map