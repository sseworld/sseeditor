import * as Chars from '../pattern/Chars';
import { Custom } from '../pattern/Custom';
import * as Safe from '../pattern/Safe';
import * as Unsafe from '../pattern/Unsafe';
const safeword = Safe.word;
const safetoken = Safe.token;
const custom = Custom;
const unsafeword = Unsafe.word;
const unsafetoken = Unsafe.token;
const sanitise = Safe.sanitise;
const chars = Chars.chars;
const wordbreak = Chars.wordbreak;
const wordchar = Chars.wordchar;
const punctuation = Chars.punctuation;
export { safeword, safetoken, custom, unsafeword, unsafetoken, sanitise, chars, wordbreak, wordchar, punctuation };
//# sourceMappingURL=Pattern.js.map