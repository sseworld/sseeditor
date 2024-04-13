"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var Compare = require("ssephox/sugar/api/dom/Compare");
var DocumentPosition = require("ssephox/sugar/api/dom/DocumentPosition");
var Insert = require("ssephox/sugar/api/dom/Insert");
var InsertAll = require("ssephox/sugar/api/dom/InsertAll");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Html = require("ssephox/sugar/api/properties/Html");
bedrock_client_1.UnitTest.test('DocumentPositionTest', function () {
    var container = SugarElement_1.SugarElement.fromTag('div');
    var p1 = SugarElement_1.SugarElement.fromTag('p');
    var p1t1 = SugarElement_1.SugarElement.fromText('p1text');
    var p1t2 = SugarElement_1.SugarElement.fromText('p2text');
    var p1s1 = SugarElement_1.SugarElement.fromTag('span');
    var p1s1t1 = SugarElement_1.SugarElement.fromText('spantext');
    /* Note: this looks like
     * <div>
     *   <p>
     *     p1text
     *     p2text
     *     <span>
     *       spantext
     *     </span>
     *   </p>
     * </div>
     */
    InsertAll.append(container, [p1]);
    InsertAll.append(p1, [p1t1, p1t2, p1s1]);
    InsertAll.append(p1s1, [p1s1t1]);
    Insert.append(SugarBody.body(), container);
    var check = function (expected, start, soffset, finish, foffset, msg) {
        bedrock_client_1.Assert.eq(msg, expected, DocumentPosition.after(start, soffset, finish, foffset));
    };
    check(true, container, 1, p1t1, ''.length, 'Selection from (div,end) -> (p1t1,0) should be RTL');
    check(false, p1t1, 0, container, 1, 'Selection from (p1t1,0) -> (div,end) should be LTR');
    check(true, container, 1, p1t1, 'p1text'.length, 'Selection from (div,end) -> (p1t1,end) should be RTL');
    check(false, p1t1, 'p1text'.length, container, 1, 'Selection from (p1t1,end) -> (div,end) should be LTR');
    check(true, container, 1, p1s1t1, 'spantext'.length, 'Selection from (div,end) -> (p1s1t1,end) should be RTL');
    check(false, p1s1t1, 'spantext'.length, container, 1, 'Selection from  (p1s1t1,end) -> (div,end) should be LTR');
    check(true, container, 1, p1, 3, 'Selection from (div,end) -> (p,end) should be RTL');
    check(false, p1, 3, container, 1, 'Selection from (p,end) -> (div,end) should be LTR');
    Remove.remove(container);
    // commonAncestorContainer tests
    (function () {
        var div = SugarElement_1.SugarElement.fromTag('div');
        var p11 = SugarElement_1.SugarElement.fromTag('p');
        var p2 = SugarElement_1.SugarElement.fromTag('p');
        var p1text = SugarElement_1.SugarElement.fromText('One');
        var p1textb = SugarElement_1.SugarElement.fromText(', two');
        var p1span = SugarElement_1.SugarElement.fromTag('span');
        var p1span1 = SugarElement_1.SugarElement.fromText('cat');
        var p1span2 = SugarElement_1.SugarElement.fromText(' dog ');
        var p2br = SugarElement_1.SugarElement.fromTag('br');
        InsertAll.append(div, [p11, p2]);
        InsertAll.append(p11, [p1text, p1textb, p1span]);
        InsertAll.append(p1span, [p1span1, p1span2]);
        Insert.append(p2, p2br);
        /* div+-p1
              |  |-p1text
              |  |-p1textb
              |  +-p1span
              |         |-p1span1
              |         +-p1span2
              +-p2
                 +-p2br
        */
        bedrock_client_1.Assert.eq('lca(div,0,div,0)===' + Html.getOuter(DocumentPosition.commonAncestorContainer(div, 0, div, 0)) + ", expected: '<div>...'", true, Compare.eq(div, DocumentPosition.commonAncestorContainer(div, 0, div, 0)));
        bedrock_client_1.Assert.eq('lca(p1,0,p2,0)===' + Html.getOuter(DocumentPosition.commonAncestorContainer(p11, 0, p2, 0)) + ", expected: '<div>...'", true, Compare.eq(div, DocumentPosition.commonAncestorContainer(p11, 0, p2, 0)));
        bedrock_client_1.Assert.eq('lca(div,1,div,2)===' + Html.getOuter(DocumentPosition.commonAncestorContainer(div, 1, div, 2)) + ", expected: '<div>...'", true, Compare.eq(div, DocumentPosition.commonAncestorContainer(div, 1, div, 2)));
        bedrock_client_1.Assert.eq('lca(p1span1,0,p2br,0)===' + Html.getOuter(DocumentPosition.commonAncestorContainer(p1span1, 0, p2br, 0)) + ", expected: '<div>...'", true, Compare.eq(div, DocumentPosition.commonAncestorContainer(p1span1, 0, p2br, 0)));
        bedrock_client_1.Assert.eq('lca(p1text,0,p1span2,0)===' + Html.getOuter(DocumentPosition.commonAncestorContainer(p1text, 0, p1span2, 0)) + ", expected: 'p1': <p>One, two...", true, Compare.eq(p11, DocumentPosition.commonAncestorContainer(p1text, 0, p1span2, 0)));
        bedrock_client_1.Assert.eq('lca(p1span1,0,p1span2,0)===' + Html.getOuter(DocumentPosition.commonAncestorContainer(p1span1, 0, p1span2, 0)) + ", expected: 'p1span': <span>cat dog </span>", true, Compare.eq(p1span, DocumentPosition.commonAncestorContainer(p1span1, 0, p1span2, 0)));
    })();
});
//# sourceMappingURL=DocumentPositionTest.js.map