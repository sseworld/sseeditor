import { Arr, Optional } from '@ssephox/katamari';
const units = {
    // we don't really support all of these different ways to express a length
    unsupportedLength: [
        'em',
        'ex',
        'cap',
        'ch',
        'ic',
        'rem',
        'lh',
        'rlh',
        'vw',
        'vh',
        'vi',
        'vb',
        'vmin',
        'vmax',
        'cm',
        'mm',
        'Q',
        'in',
        'pc',
        'pt',
        'px'
    ],
    // these are the length values we do support
    fixed: ['px', 'pt'],
    relative: ['%'],
    empty: ['']
};
// Built from https://tc39.es/ecma262/#prod-StrDecimalLiteral
// Matches a float followed by a trailing set of characters
const pattern = (() => {
    const decimalDigits = '[0-9]+';
    const signedInteger = '[+-]?' + decimalDigits;
    const exponentPart = '[eE]' + signedInteger;
    const dot = '\\.';
    const opt = (input) => `(?:${input})?`;
    const unsignedDecimalLiteral = [
        'Infinity',
        decimalDigits + dot + opt(decimalDigits) + opt(exponentPart),
        dot + decimalDigits + opt(exponentPart),
        decimalDigits + opt(exponentPart)
    ].join('|');
    const float = `[+-]?(?:${unsignedDecimalLiteral})`;
    return new RegExp(`^(${float})(.*)$`);
})();
const isUnit = (unit, accepted) => Arr.exists(accepted, (acc) => Arr.exists(units[acc], (check) => unit === check));
export const parse = (input, accepted) => {
    const match = Optional.from(pattern.exec(input));
    return match.bind((array) => {
        const value = Number(array[1]);
        const unitRaw = array[2];
        if (isUnit(unitRaw, accepted)) {
            return Optional.some({
                value,
                unit: unitRaw
            });
        }
        else {
            return Optional.none();
        }
    });
};
export const normalise = (input, accepted) => parse(input, accepted).map(({ value, unit }) => value + unit);
//# sourceMappingURL=Dimension.js.map