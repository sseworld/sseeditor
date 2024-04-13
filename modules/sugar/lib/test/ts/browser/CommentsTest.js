"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var SugarComment = require("ssephox/sugar/api/node/SugarComment");
var SugarComments = require("ssephox/sugar/api/node/SugarComments");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
bedrock_client_1.UnitTest.test('CommentsTest', function () {
    var testPage = SugarElement_1.SugarElement.fromHtml('<div><!--one--></head><body><!--two--><p><!--three--></p></div>');
    var all = SugarComments.find(testPage, katamari_1.Optional.none());
    bedrock_client_1.Assert.eq('', 3, all.length);
    bedrock_client_1.Assert.eq('', 'one', SugarComment.get(all[0]));
    bedrock_client_1.Assert.eq('', 'two', SugarComment.get(all[1]));
    bedrock_client_1.Assert.eq('', 'three', SugarComment.get(all[2]));
    var one = SugarComments.find(testPage, katamari_1.Optional.some(function (value) { return value === 'one'; }));
    bedrock_client_1.Assert.eq('', 1, one.length);
    bedrock_client_1.Assert.eq('', 'one', SugarComment.get(one[0]));
});
//# sourceMappingURL=CommentsTest.js.map