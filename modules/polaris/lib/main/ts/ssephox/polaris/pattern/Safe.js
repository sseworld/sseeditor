import { Regex } from '@ssephox/katamari';
import * as Unsafe from './Unsafe';
/** Escapes regex characters in a string */
const sanitise = Regex.escape;
const word = (input) => {
    const value = sanitise(input);
    return Unsafe.word(value);
};
const token = (input) => {
    const value = sanitise(input);
    return Unsafe.token(value);
};
export { sanitise, word, token };
//# sourceMappingURL=Safe.js.map