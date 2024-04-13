"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Class = require("ssephox/sugar/api/properties/Class");
var SelectorExists = require("ssephox/sugar/api/search/SelectorExists");
var SelectorFilter = require("ssephox/sugar/api/search/SelectorFilter");
var SelectorFind = require("ssephox/sugar/api/search/SelectorFind");
var Selectors = require("ssephox/sugar/api/search/Selectors");
var Checkers = require("ssephox/sugar/test/Checkers");
var Div_1 = require("ssephox/sugar/test/Div");
var TestPage = require("ssephox/sugar/test/TestPage");
bedrock_client_1.UnitTest.test('SelectorTest', function () {
    // Querying non-element nodes does not throw an error
    var textnode = SugarElement_1.SugarElement.fromText('');
    var commentnode = SugarElement_1.SugarElement.fromHtml('<!--a-->');
    bedrock_client_1.Assert.eq('', false, Selectors.is(textnode, 'anything'));
    bedrock_client_1.Assert.eq('', false, Selectors.is(commentnode, 'anything'));
    bedrock_client_1.Assert.eq('', [], Selectors.all('anything', textnode));
    bedrock_client_1.Assert.eq('', [], Selectors.all('anything', commentnode));
    Checkers.checkOpt(katamari_1.Optional.none(), Selectors.one('anything', textnode));
    Checkers.checkOpt(katamari_1.Optional.none(), Selectors.one('anything', commentnode));
    bedrock_client_1.Assert.eq('', [], SelectorFilter.ancestors(textnode, 'anything'));
    bedrock_client_1.Assert.eq('', [], SelectorFilter.siblings(textnode, 'anything'));
    bedrock_client_1.Assert.eq('', [], SelectorFilter.children(textnode, 'anything'));
    try {
        // IE throws an error running complex queries on an empty div
        // http://jsfiddle.net/spyder/fv9ptr5L/
        var empty = (0, Div_1.default)();
        Selectors.all('img:not([data-ephox-polish-blob])', empty);
    }
    catch (e) {
        bedrock_client_1.Assert.fail(e);
    }
    TestPage.connect(); // description of structure is in TestPage
    Checkers.checkOpt(katamari_1.Optional.none(), Selectors.one('asdf'));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.p1), SelectorFind.first('p'));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.p1), Selectors.one('p'));
    Checkers.checkOpt(katamari_1.Optional.none(), SelectorFind.sibling(TestPage.s1, 'p'));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.s3), SelectorFind.sibling(TestPage.s4, 'span'));
    Checkers.checkOpt(katamari_1.Optional.none(), SelectorFind.ancestor(TestPage.s1, 'li'));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.container), SelectorFind.ancestor(TestPage.s4, 'div'));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.s2), SelectorFind.descendant(TestPage.p2, 'span'));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.s3), SelectorFind.descendant(TestPage.p2, 'span span'));
    Checkers.checkOpt(katamari_1.Optional.none(), SelectorFind.child(TestPage.p2, 'li'));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.s1), SelectorFind.child(TestPage.p1, 'span'));
    Checkers.checkOpt(katamari_1.Optional.none(), SelectorFind.closest(TestPage.p1, 'span'));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.p1), SelectorFind.closest(TestPage.p1, 'p'));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.p1), SelectorFind.closest(TestPage.s1, 'p'));
    Checkers.checkOpt(katamari_1.Optional.some(TestPage.p1), SelectorFind.closest(TestPage.t1, 'p'));
    Checkers.checkList([TestPage.p1, TestPage.p3, TestPage.p2], SelectorFilter.all('p'));
    Checkers.checkList([TestPage.p1, TestPage.p3, TestPage.p2], Selectors.all('p'));
    Checkers.checkList([TestPage.s3, TestPage.s2], SelectorFilter.ancestors(TestPage.t4, 'span'));
    Checkers.checkList([TestPage.d1, TestPage.container], SelectorFilter.ancestors(TestPage.p3, 'div'));
    Checkers.checkList([], SelectorFilter.ancestors(TestPage.t4, 'table'));
    Checkers.checkList([TestPage.s1], SelectorFilter.siblings(TestPage.t1, '*'));
    Checkers.checkList([], SelectorFilter.siblings(TestPage.t5, '*'));
    Checkers.checkList([TestPage.s1], SelectorFilter.children(TestPage.p1, 'span'));
    Checkers.checkList([], SelectorFilter.children(TestPage.p1, 'li'));
    Checkers.checkList([TestPage.s1, TestPage.s2, TestPage.s3, TestPage.s4], SelectorFilter.descendants(TestPage.container, 'span'));
    Checkers.checkList([], SelectorFilter.descendants(TestPage.container, 'blockquote'));
    bedrock_client_1.Assert.eq('', true, SelectorExists.any('p'));
    bedrock_client_1.Assert.eq('', false, SelectorExists.any('table'));
    bedrock_client_1.Assert.eq('', true, SelectorExists.ancestor(TestPage.t1, 'p'));
    bedrock_client_1.Assert.eq('', false, SelectorExists.ancestor(TestPage.t1, 'span'));
    bedrock_client_1.Assert.eq('', true, SelectorExists.sibling(TestPage.p2, 'p'));
    bedrock_client_1.Assert.eq('', false, SelectorExists.sibling(TestPage.t1, 'p'));
    bedrock_client_1.Assert.eq('', true, SelectorExists.child(TestPage.p1, 'span'));
    bedrock_client_1.Assert.eq('', false, SelectorExists.child(TestPage.p2, 'label'));
    bedrock_client_1.Assert.eq('', true, SelectorExists.descendant(TestPage.p2, 'span'));
    bedrock_client_1.Assert.eq('', false, SelectorExists.closest(TestPage.p1, 'span'));
    bedrock_client_1.Assert.eq('', true, SelectorExists.closest(TestPage.p1, 'p'));
    bedrock_client_1.Assert.eq('', true, SelectorExists.closest(TestPage.s1, 'p'));
    bedrock_client_1.Assert.eq('', true, SelectorExists.closest(TestPage.t1, 'p'));
    // simple selectors
    bedrock_client_1.Assert.eq('Text node should not match "p"', false, Selectors.is(TestPage.t1, 'p'));
    bedrock_client_1.Assert.eq('Paragraph should match "p"', true, Selectors.is(TestPage.p1, 'p'));
    bedrock_client_1.Assert.eq('Paragraph should not match "span"', false, Selectors.is(TestPage.p1, 'span'));
    bedrock_client_1.Assert.eq('Paragraph should not match "p.blue"', false, Selectors.is(TestPage.p1, 'p.blue'));
    bedrock_client_1.Assert.eq('Span should match "span"', true, Selectors.is(TestPage.s3, 'span'));
    // slightly more advanced selectors
    bedrock_client_1.Assert.eq('Paragraph should match "p"', true, Selectors.is(TestPage.p1, 'div > p'));
    bedrock_client_1.Assert.eq('Paragraph should match "p"', true, Selectors.is(TestPage.p1, 'div > p:first-child'));
    bedrock_client_1.Assert.eq('Paragraph should match "p"', true, Selectors.is(TestPage.p2, 'div > p:last-child'));
    bedrock_client_1.Assert.eq('Span should match "span"', true, Selectors.is(TestPage.s4, 'div > p:last-child span span:last-child'));
    // Mutating content.
    Class.add(TestPage.p1, 'blue');
    bedrock_client_1.Assert.eq('Paragraph should (now) match "p.blue"', true, Selectors.is(TestPage.p1, 'p.blue'));
    Remove.remove(TestPage.container);
});
//# sourceMappingURL=SelectorTest.js.map