"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var DomEvent = require("ssephox/sugar/api/events/DomEvent");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Css = require("ssephox/sugar/api/properties/Css");
var Html = require("ssephox/sugar/api/properties/Html");
var Traverse = require("ssephox/sugar/api/search/Traverse");
bedrock_client_1.UnitTest.asynctest('CssReflowTest', function (success, failure) {
    var iframe = SugarElement_1.SugarElement.fromHtml('<iframe style="height:100px; width:500px;" src="/project/@ephox/sugar/src/test/data/cssReflowTest.html"></iframe>');
    Insert.append(SugarBody.body(), iframe);
    var run = DomEvent.bind(iframe, 'load', function () {
        run.unbind();
        try {
            checks();
            success();
        }
        catch (e) {
            failure(e);
        }
        finally {
            Remove.remove(iframe);
        }
    });
    var checks = function () {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        var iframeWin = iframe.dom.contentWindow;
        var iframeDoc = iframeWin.document;
        var styles = SugarElement_1.SugarElement.fromTag('style', iframeDoc);
        Html.set(styles, 'span.style {border-left-style: solid; }');
        Insert.append(SugarElement_1.SugarElement.fromDom(iframeDoc.head), styles);
        var reflowTest = SugarElement_1.SugarElement.fromTag('div', iframeDoc);
        Insert.append(SugarElement_1.SugarElement.fromDom(iframeDoc.body), reflowTest);
        Html.set(reflowTest, '<span class="style">text</span>');
        var newspan = Traverse.firstChild(reflowTest).getOrDie('test broke');
        Css.reflow(newspan);
        // TODO: I can't actually make this fail without a reflow, we need a more stressful test. But you get the idea.
        bedrock_client_1.Assert.eq('', 'solid', Css.get(newspan, 'border-left-style'));
        Remove.remove(newspan);
    };
});
//# sourceMappingURL=CssReflowTest.js.map