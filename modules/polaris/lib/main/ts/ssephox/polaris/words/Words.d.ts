export type Word<T> = T[];
interface WordIndex {
    readonly start: number;
    readonly end: number;
}
export interface WordsWithIndices<T> {
    readonly words: Word<T>[];
    readonly indices: WordIndex[];
}
export interface WordOptions {
    includeWhitespace?: boolean;
    includePunctuation?: boolean;
}
declare const getWordsWithIndices: <T>(chars: Word<T>, extract: (char: T) => string, options?: WordOptions) => WordsWithIndices<T>;
declare const getWords: <T>(chars: Word<T>, extract: (char: T) => string, options?: WordOptions) => Word<T>[];
export { getWords, getWordsWithIndices };
//# sourceMappingURL=Words.d.ts.map