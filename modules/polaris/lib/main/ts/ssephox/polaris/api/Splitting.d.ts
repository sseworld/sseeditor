type SplittingHandler<T, U> = (item: T) => U;
export interface Splitting<T> {
    fold: <U>(onInclude: SplittingHandler<T, U>, onExcludeWith: SplittingHandler<T, U>, onExcludeWithout: SplittingHandler<T, U>) => U;
    match: <U>(branches: {
        include: SplittingHandler<T, U>;
        excludeWith: SplittingHandler<T, U>;
        excludeWithout: SplittingHandler<T, U>;
    }) => U;
    log: (label: string) => void;
}
export declare const Splitting: {
    include: <T>(item: T) => Splitting<T>;
    excludeWith: <T_1>(item: T_1) => Splitting<T_1>;
    excludeWithout: <T_2>(item: T_2) => Splitting<T_2>;
    cata: <T_3, U>(subject: Splitting<T_3>, onInclude: SplittingHandler<T_3, U>, onExcludeWith: SplittingHandler<T_3, U>, onExcludeWithout: SplittingHandler<T_3, U>) => U;
};
export {};
//# sourceMappingURL=Splitting.d.ts.map