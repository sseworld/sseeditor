import { PRegExp } from './Types';
/** Escapes regex characters in a string */
declare const sanitise: (text: string) => string;
declare const word: (input: string) => PRegExp;
declare const token: (input: string) => PRegExp;
export { sanitise, word, token };
//# sourceMappingURL=Safe.d.ts.map