"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Compare = require("ssephox/sugar/api/dom/Compare");
var DomFuture = require("ssephox/sugar/api/dom/DomFuture");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
bedrock_client_1.UnitTest.asynctest('Browser Test: .DomFutureTest', function (success) {
    var testElement = SugarElement_1.SugarElement.fromTag('button');
    DomFuture.waitFor(testElement, 'click', 1000).get(function (res) {
        bedrock_client_1.Assert.eq('Result should be error as click has not yet occurred.', true, res.isError());
        DomFuture.waitFor(testElement, 'click', 1000).get(function (r) {
            r.fold(function (err) {
                bedrock_client_1.Assert.fail('Future should have returned value(event). Instead returned error(' + err + ')');
            }, function (val) {
                bedrock_client_1.Assert.eq('Checking that the target of the event is correct', true, Compare.eq(testElement, val.target));
                success();
            });
        });
        // TODO: test timeout on click
        testElement.dom.click();
    });
});
//# sourceMappingURL=DomFutureTest.js.map