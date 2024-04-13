"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var fast_check_1 = require("fast-check");
var Dimension = require("ssephox/sugar/api/view/Dimension");
bedrock_client_1.UnitTest.test('All valid floats are valid', function () {
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.oneof(
    // small to medium floats
    fast_check_1.default.float(), 
    // big floats
    fast_check_1.default.tuple(fast_check_1.default.float(), fast_check_1.default.integer(-20, 20)).map(function (_a) {
        var mantissa = _a[0], exponent = _a[1];
        return mantissa * Math.pow(10, exponent);
    })), function (num) {
        var parsed = Dimension.parse(num.toString(), ['empty']).getOrDie();
        bedrock_client_1.Assert.eq('Number is unchanged by stringifying and parsing', num, parsed.value);
        bedrock_client_1.Assert.eq('Unit is empty', '', parsed.unit);
        return true;
    }));
});
bedrock_client_1.UnitTest.test('All valid integers are valid', function () {
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), function (num) {
        var parsed = Dimension.parse(num.toString(), ['empty']).getOrDie();
        bedrock_client_1.Assert.eq('Number is unchanged by stringifying and parsing', num, parsed.value);
        bedrock_client_1.Assert.eq('Unit is empty', '', parsed.unit);
        return true;
    }));
});
bedrock_client_1.UnitTest.test('Accepts known units', function () {
    bedrock_client_1.Assert.succeeds('Accepts % in relative', function () { return katamari_1.Optionals.is(Dimension.parse('1%', ['relative']), { value: 1, unit: '%' }); });
    bedrock_client_1.Assert.succeeds('Accepts px in fixed', function () { return katamari_1.Optionals.is(Dimension.parse('20px', ['fixed']), { value: 20, unit: 'px' }); });
    bedrock_client_1.Assert.succeeds('Does not accept % in fixed', function () { return Dimension.parse('1%', ['fixed']).isNone(); });
    bedrock_client_1.Assert.succeeds('Accepts px in fixed/relative', function () { return katamari_1.Optionals.is(Dimension.parse('20px', ['fixed', 'relative']), { value: 20, unit: 'px' }); });
    bedrock_client_1.Assert.succeeds('Accepts unitless in unitless', function () { return katamari_1.Optionals.is(Dimension.parse('1.4', ['empty']), { value: 1.4, unit: '' }); });
    bedrock_client_1.Assert.succeeds('Does not accept unitless without unitless', function () { return Dimension.parse('1.4', ['fixed', 'unsupportedLength', 'relative']).isNone(); });
});
//# sourceMappingURL=DimensionParseTest.js.map