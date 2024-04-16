import { Arr } from '@ssephox/katamari';
import * as UnicodeData from './UnicodeData';
const SETS = UnicodeData.SETS;
const OTHER = UnicodeData.characterIndices.OTHER;
const getType = (char) => {
    let type = OTHER;
    const setsLength = SETS.length;
    for (let j = 0; j < setsLength; ++j) {
        const set = SETS[j];
        if (set && set.test(char)) {
            type = j;
            break;
        }
    }
    return type;
};
const memoize = (func) => {
    const cache = {};
    return (char) => {
        if (cache[char]) {
            return cache[char];
        }
        else {
            const result = func(char);
            cache[char] = result;
            return result;
        }
    };
};
const classify = (characters) => {
    const memoized = memoize(getType);
    return Arr.map(characters, memoized);
};
export { classify };
//# sourceMappingURL=StringMapper.js.map