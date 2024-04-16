import { Optional } from '@ssephox/katamari';
import { PRegExp } from '../pattern/Types';
type SafewordApi = (input: string) => PRegExp;
declare const safeword: SafewordApi;
type SafeTokenApi = (input: string) => PRegExp;
declare const safetoken: SafeTokenApi;
type CustomApi = (regex: string, prefix: (match: RegExpExecArray) => number, suffix: (match: RegExpExecArray) => number, flags: Optional<string>) => PRegExp;
declare const custom: CustomApi;
type UnsafewordApi = (input: string) => PRegExp;
declare const unsafeword: UnsafewordApi;
type UnsafetokenApi = (input: string) => PRegExp;
declare const unsafetoken: UnsafetokenApi;
type SanitiseApi = (input: string) => string;
declare const sanitise: SanitiseApi;
type CharsApi = () => string;
declare const chars: CharsApi;
type WordbreakApi = () => string;
declare const wordbreak: WordbreakApi;
type WordcharApi = () => string;
declare const wordchar: WordcharApi;
type PunctuationApi = () => string;
declare const punctuation: PunctuationApi;
export { safeword, safetoken, custom, unsafeword, unsafetoken, sanitise, chars, wordbreak, wordchar, punctuation };
//# sourceMappingURL=Pattern.d.ts.map