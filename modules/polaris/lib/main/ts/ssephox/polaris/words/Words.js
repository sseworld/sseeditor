import { Arr } from '@ssephox/katamari';
import { classify } from './StringMapper';
import * as UnicodeData from './UnicodeData';
import { isWordBoundary } from './WordBoundary';
const EMPTY_STRING = UnicodeData.EMPTY_STRING;
const WHITESPACE = UnicodeData.WHITESPACE;
const PUNCTUATION = UnicodeData.PUNCTUATION;
const isProtocol = (str) => str === 'http' || str === 'https';
const findWordEnd = (characters, startIndex) => {
    let i;
    for (i = startIndex; i < characters.length; i++) {
        if (WHITESPACE.test(characters[i])) {
            break;
        }
    }
    return i;
};
const findUrlEnd = (characters, startIndex) => {
    const endIndex = findWordEnd(characters, startIndex + 1);
    const peakedWord = characters.slice(startIndex + 1, endIndex).join(EMPTY_STRING);
    return peakedWord.substr(0, 3) === '://' ? endIndex : startIndex;
};
const findWordsWithIndices = (chars, sChars, characterMap, options) => {
    const words = [];
    const indices = [];
    let word = [];
    // Loop through each character in the classification map and determine whether
    // it precedes a word boundary, building an array of distinct words as we go.
    for (let i = 0; i < characterMap.length; ++i) {
        // Append this character to the current word.
        word.push(chars[i]);
        // If there's a word boundary between the current character and the next character,
        // append the current word to the words array and start building a new word.
        if (isWordBoundary(characterMap, i)) {
            const ch = sChars[i];
            if ((options.includeWhitespace || !WHITESPACE.test(ch)) &&
                (options.includePunctuation || !PUNCTUATION.test(ch))) {
                const startOfWord = i - word.length + 1;
                const endOfWord = i + 1;
                const str = sChars.slice(startOfWord, endOfWord).join(EMPTY_STRING);
                if (isProtocol(str)) {
                    const endOfUrl = findUrlEnd(sChars, i);
                    const url = chars.slice(endOfWord, endOfUrl);
                    Array.prototype.push.apply(word, url);
                    i = endOfUrl;
                }
                words.push(word);
                indices.push({
                    start: startOfWord,
                    end: endOfWord
                });
            }
            word = [];
        }
    }
    return { words, indices };
};
const getDefaultOptions = () => ({
    includeWhitespace: false,
    includePunctuation: false
});
const getWordsWithIndices = (chars, extract, options) => {
    options = {
        ...getDefaultOptions(),
        ...options
    };
    const extractedChars = Arr.map(chars, extract);
    const characterMap = classify(extractedChars);
    return findWordsWithIndices(chars, extractedChars, characterMap, options);
};
const getWords = (chars, extract, options) => getWordsWithIndices(chars, extract, options).words;
export { getWords, getWordsWithIndices };
//# sourceMappingURL=Words.js.map