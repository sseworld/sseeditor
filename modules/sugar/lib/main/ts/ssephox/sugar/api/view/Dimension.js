"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalise = exports.parse = void 0;
var katamari_1 = require("@ssephox/katamari");
var units = {
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
var pattern = (function () {
    var decimalDigits = '[0-9]+';
    var signedInteger = '[+-]?' + decimalDigits;
    var exponentPart = '[eE]' + signedInteger;
    var dot = '\\.';
    var opt = function (input) { return "(?:".concat(input, ")?"); };
    var unsignedDecimalLiteral = [
        'Infinity',
        decimalDigits + dot + opt(decimalDigits) + opt(exponentPart),
        dot + decimalDigits + opt(exponentPart),
        decimalDigits + opt(exponentPart)
    ].join('|');
    var float = "[+-]?(?:".concat(unsignedDecimalLiteral, ")");
    return new RegExp("^(".concat(float, ")(.*)$"));
})();
var isUnit = function (unit, accepted) {
    return katamari_1.Arr.exists(accepted, function (acc) {
        return katamari_1.Arr.exists(units[acc], function (check) { return unit === check; });
    });
};
var parse = function (input, accepted) {
    var match = katamari_1.Optional.from(pattern.exec(input));
    return match.bind(function (array) {
        var value = Number(array[1]);
        var unitRaw = array[2];
        if (isUnit(unitRaw, accepted)) {
            return katamari_1.Optional.some({
                value: value,
                unit: unitRaw
            });
        }
        else {
            return katamari_1.Optional.none();
        }
    });
};
exports.parse = parse;
var normalise = function (input, accepted) {
    return (0, exports.parse)(input, accepted).map(function (_a) {
        var value = _a.value, unit = _a.unit;
        return value + unit;
    });
};
exports.normalise = normalise;
//# sourceMappingURL=Dimension.js.map