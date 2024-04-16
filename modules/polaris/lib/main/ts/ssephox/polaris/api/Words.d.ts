import * as Words from '../words/Words';
type GetWordsApi = <T>(chars: T[], extract: (char: T) => string, options?: Words.WordOptions) => Words.Word<T>[];
declare const getWords: GetWordsApi;
type GetWordsAndIndicesApi = <T>(chars: T[], extract: (char: T) => string, options?: Words.WordOptions) => Words.WordsWithIndices<T>;
declare const getWordsWithIndices: GetWordsAndIndicesApi;
export { getWords, getWordsWithIndices };
//# sourceMappingURL=Words.d.ts.map