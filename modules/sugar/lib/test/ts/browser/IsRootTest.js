"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var Compare = require("ssephox/sugar/api/dom/Compare");
var Remove = require("ssephox/sugar/api/dom/Remove");
var PredicateExists = require("ssephox/sugar/api/search/PredicateExists");
var PredicateFilter = require("ssephox/sugar/api/search/PredicateFilter");
var PredicateFind = require("ssephox/sugar/api/search/PredicateFind");
var SelectorExists = require("ssephox/sugar/api/search/SelectorExists");
var SelectorFilter = require("ssephox/sugar/api/search/SelectorFilter");
var SelectorFind = require("ssephox/sugar/api/search/SelectorFind");
var Traverse = require("ssephox/sugar/api/search/Traverse");
var Checkers = require("ssephox/sugar/test/Checkers");
var TestPage = require("ssephox/sugar/test/TestPage");
bedrock_client_1.UnitTest.test('IsRootTest', function () {
    TestPage.connect(); // description of structure is in TestPage
    var isRoot = function (e) { return Compare.eq(TestPage.d1, e); };
    var checkNone = function (optElement) { return Checkers.checkOpt(katamari_1.Optional.none(), optElement); };
    checkNone(SelectorFind.ancestor(TestPage.t6, 'li', isRoot));
    checkNone(SelectorFind.ancestor(TestPage.t6, 'ol,ul', isRoot));
    checkNone(PredicateFind.ancestor(TestPage.t6, Checkers.isName('li'), isRoot));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.d1), SelectorFind.ancestor(TestPage.t6, 'div', isRoot));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.d1), PredicateFind.ancestor(TestPage.t6, Checkers.isName('div'), isRoot));
    checkNone(SelectorFind.closest(TestPage.t6, 'li', isRoot));
    checkNone(SelectorFind.closest(TestPage.t6, 'ol,ul', isRoot));
    checkNone(SelectorFind.closest(TestPage.d1, 'ol,ul', isRoot));
    checkNone(PredicateFind.closest(TestPage.t6, Checkers.isName('li'), isRoot));
    checkNone(PredicateFind.closest(TestPage.d1, Checkers.isName('li'), isRoot));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.d1), SelectorFind.closest(TestPage.t6, 'div', isRoot));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.d1), SelectorFind.closest(TestPage.d1, 'div', isRoot));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.d1), PredicateFind.closest(TestPage.t6, Checkers.isName('div'), isRoot));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.d1), PredicateFind.closest(TestPage.d1, Checkers.isName('div'), isRoot));
    Checkers.checkList([TestPage.d1], SelectorFilter.ancestors(TestPage.p3, '*', isRoot));
    Checkers.checkList([TestPage.d1], PredicateFilter.ancestors(TestPage.p3, katamari_1.Fun.always, isRoot));
    bedrock_client_1.Assert.eq('', false, SelectorExists.closest(TestPage.p3, 'li', isRoot));
    bedrock_client_1.Assert.eq('', false, SelectorExists.closest(TestPage.p3, 'ol,ul', isRoot));
    bedrock_client_1.Assert.eq('', false, PredicateExists.closest(TestPage.p3, Checkers.isName('li'), isRoot));
    bedrock_client_1.Assert.eq('', true, SelectorExists.closest(TestPage.p3, 'div', isRoot));
    bedrock_client_1.Assert.eq('', true, SelectorExists.closest(TestPage.d1, 'div', isRoot));
    bedrock_client_1.Assert.eq('', true, PredicateExists.closest(TestPage.p3, Checkers.isName('div'), isRoot));
    bedrock_client_1.Assert.eq('', true, PredicateExists.closest(TestPage.d1, Checkers.isName('div'), isRoot));
    bedrock_client_1.Assert.eq('', false, SelectorExists.ancestor(TestPage.p3, 'li', isRoot));
    bedrock_client_1.Assert.eq('', false, SelectorExists.ancestor(TestPage.p3, 'ol,ul', isRoot));
    bedrock_client_1.Assert.eq('', false, PredicateExists.ancestor(TestPage.p3, Checkers.isName('li'), isRoot));
    bedrock_client_1.Assert.eq('', true, SelectorExists.ancestor(TestPage.p3, 'div', isRoot));
    bedrock_client_1.Assert.eq('', true, PredicateExists.ancestor(TestPage.p3, Checkers.isName('div'), isRoot));
    Checkers.checkList([TestPage.d1], Traverse.parents(TestPage.p3, isRoot));
    Checkers.checkList([TestPage.p3, TestPage.d1], Traverse.parents(TestPage.t6, isRoot));
    Remove.remove(TestPage.container);
});
//# sourceMappingURL=IsRootTest.js.map