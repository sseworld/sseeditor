interface ChoiceOption<T> {
    predicate: () => boolean;
    value: () => T;
}
declare const isTouch: () => boolean;
declare const choice: <T>(options: ChoiceOption<T>[], fallback: T) => T;
declare const isLargeTouch: () => boolean;
declare const isLargeDesktop: () => boolean;
declare const isSmallTouch: () => boolean;
declare const isLarge: () => boolean;
declare const isSmallAndroid: () => boolean;
export { isTouch, choice, isLarge, isLargeTouch, isSmallTouch, isLargeDesktop, isSmallAndroid };
//# sourceMappingURL=Platform.d.ts.map