"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var Div_1 = require("ssephox/sugar/test/Div");
bedrock_client_1.UnitTest.test('AttributeTransfer', function () {
    var alpha = function () {
        var r = (0, Div_1.default)();
        Attribute.setAll(r, {
            title: 'monkey',
            placeholder: 'start typing'
        });
        return r;
    };
    var beta = function () {
        var r = (0, Div_1.default)();
        Attribute.setAll(r, {
            title: 'chimp',
            name: 'anon'
        });
        return r;
    };
    var gamma = function () {
        var r = (0, Div_1.default)();
        Attribute.setAll(r, {
            placeholder: 'lookup'
        });
        return r;
    };
    var check = function (expectedPresent, expectedAbsent, source, destination, attributes) {
        Attribute.transfer(source, destination, attributes);
        katamari_1.Arr.each(expectedAbsent, function (k) {
            if (Attribute.has(destination, k)) {
                bedrock_client_1.Assert.fail('Result should not have attribute: ' + k);
            }
        });
        katamari_1.Obj.each(expectedPresent, function (v, k) {
            if (!Attribute.has(destination, k)) {
                bedrock_client_1.Assert.fail('Result should have attribute: ' + k);
            }
            else {
                bedrock_client_1.Assert.eq('', v, Attribute.get(destination, k));
            }
        });
    };
    check({
        title: 'chimp',
        placeholder: 'start typing',
        name: 'anon'
    }, ['id'], alpha(), beta(), ['title', 'placeholder']);
    check({
        title: 'chimp',
        placeholder: 'start typing',
        name: 'anon'
    }, ['id'], alpha(), beta(), ['placeholder']);
    check({
        title: 'chimp',
        name: 'anon'
    }, ['placeholder'], alpha(), beta(), ['title']);
    check({
        title: 'monkey',
        placeholder: 'lookup'
    }, [], alpha(), gamma(), ['title']);
    check({
        placeholder: 'lookup'
    }, ['title'], alpha(), gamma(), []);
    check({
        title: 'chimp',
        name: 'anon',
        placeholder: 'lookup'
    }, [], beta(), gamma(), ['title', 'name', 'placeholder']);
    check({
        title: 'chimp',
        placeholder: 'lookup'
    }, ['name'], beta(), gamma(), ['title', 'placeholder']);
});
//# sourceMappingURL=AttributeTransferTest.js.map