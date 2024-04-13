import { Optional } from '@ssephox/katamari';
declare const units: {
    unsupportedLength: ("Q" | "em" | "px" | "ex" | "cap" | "ch" | "ic" | "rem" | "lh" | "rlh" | "vw" | "vh" | "vi" | "vb" | "vmin" | "vmax" | "cm" | "mm" | "in" | "pc" | "pt")[];
    fixed: ("px" | "pt")[];
    relative: "%"[];
    empty: ""[];
};
type Units = {
    [K in keyof typeof units]: typeof units[K][number];
};
export interface Dimension<U extends keyof Units> {
    readonly value: number;
    readonly unit: Units[U];
}
export declare const parse: <T extends "fixed" | "empty" | "relative" | "unsupportedLength">(input: string, accepted: T[]) => Optional<Dimension<T>>;
export declare const normalise: <T extends "fixed" | "empty" | "relative" | "unsupportedLength">(input: string, accepted: T[]) => Optional<string>;
export {};
//# sourceMappingURL=Dimension.d.ts.map