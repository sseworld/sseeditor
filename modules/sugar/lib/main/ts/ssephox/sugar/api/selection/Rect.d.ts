/**
 * @deprecated Use RawRect instead
 */
export interface StructRect {
    left: () => number;
    top: () => number;
    right: () => number;
    bottom: () => number;
    width: () => number;
    height: () => number;
}
export interface RawRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}
export declare const Rect: {
    toRaw: (sr: StructRect) => RawRect;
};
//# sourceMappingURL=Rect.d.ts.map