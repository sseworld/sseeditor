import { Optional } from '@ssephox/katamari';
/**
 * Generate a PositionArray
 *
 * xs:     list of thing
 * f:      thing -> Optional unit
 * start: sets the start position to search at
 */
declare const make: <T, R extends {
    finish: number;
}>(xs: T[], f: (x: T, offset: number) => Optional<R>, start?: number) => R[];
export { make };
//# sourceMappingURL=Generator.d.ts.map