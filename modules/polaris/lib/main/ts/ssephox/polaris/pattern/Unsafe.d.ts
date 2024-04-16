import { PRegExp } from './Types';
/**
 * Tokens have no prefix or suffix
 */
declare const token: (input: string) => PRegExp;
/**
 * Words have complex rules as to what a "word break" actually is.
 *
 * These are consumed by the regex and then excluded by prefix/suffix lengths.
 */
declare const word: (input: string) => PRegExp;
export { token, word };
//# sourceMappingURL=Unsafe.d.ts.map