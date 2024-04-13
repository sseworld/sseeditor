"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Replication = require("ssephox/sugar/api/dom/Replication");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Traverse = require("ssephox/sugar/api/search/Traverse");
bedrock_client_1.UnitTest.test('ReplicationTest', function () {
    var checkValues = function (expected, actual) {
        bedrock_client_1.Assert.eq('', expected.name, 'span');
        bedrock_client_1.Assert.eq('', expected.attrs.href, actual.dom.getAttribute('href'));
        bedrock_client_1.Assert.eq('', expected.attrs['data-color'], actual.dom.getAttribute('data-color'));
        bedrock_client_1.Assert.eq('', expected.styles.margin, actual.dom.style.getPropertyValue('margin'));
        bedrock_client_1.Assert.eq('', expected.styles.padding, actual.dom.style.getPropertyValue('padding'));
    };
    var checkCopy = function (expected, input) {
        var initial = SugarElement_1.SugarElement.fromHtml(input);
        var actual = Replication.copy(initial, 'span');
        checkValues(expected, actual);
    };
    var checkMutate = function (expected, input) {
        var initial = SugarElement_1.SugarElement.fromHtml(input);
        var actual = Replication.mutate(initial, 'span');
        // mutate destroys the original element
        bedrock_client_1.Assert.eq('', 0, Traverse.children(initial).length);
        checkValues(expected, actual);
    };
    var check = function (expected, input) {
        checkCopy(expected, input);
        checkMutate(expected, input);
    };
    var exp = {
        name: 'span',
        attrs: {
            'href': 'http://www.google.com',
            'data-color': 'red'
        },
        styles: {
            margin: '0px',
            padding: '0px'
        },
        innerHtml: 'Link'
    };
    check(exp, '<a href="http://www.google.com" data-color="red" style="margin: 0; padding: 0;">Link</a>');
});
//# sourceMappingURL=ReplicationTest.js.map