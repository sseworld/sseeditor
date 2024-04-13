"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var katamari_assertions_1 = require("@ssephox/katamari-assertions");
var Hierarchy = require("ssephox/sugar/api/dom/Hierarchy");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var SugarNode = require("ssephox/sugar/api/node/SugarNode");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var Html = require("ssephox/sugar/api/properties/Html");
var ElementAddress = require("ssephox/sugar/api/search/ElementAddress");
bedrock_client_1.UnitTest.test('ElementAddressTest', function () {
    var page = SugarElement_1.SugarElement.fromHtml('<div>' +
        '<p id="p1">This is a paragraph <span id="s1">word</span> and another <span id="s2">word</span> and another <span id="s3">word</span> and more</p>' +
        '<table>' +
        '<thead>' +
        '<tr>' +
        '<th>Name</th><th>Occupation</th><th>Entitlement</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr>' +
        '<th>A</th><th>B</th><th>C</th>' +
        '</tr>' +
        '<tr>' +
        '<td>A1</td><td>B1</td><td>C1</td>' +
        '</tr>' +
        '<tr>' +
        '<td>A2</td><td>B2</td><td>C2</td>' +
        '</tr>' +
        '<tr>' +
        '<td>A3</td><td>B3</td><td>C3</td>' +
        '</tr>' +
        '<tr>' +
        '<td>A4</td><td>B4</td><td>C4</td>' +
        '</tr>' +
        '<tr>' +
        '<td>A5</td><td>B5</td><td>C5</td>' +
        '</tr>' +
        '<tr>' +
        '<td>A6</td><td>B6</td><td>C6</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '<p id="p2">Another paragraph</p>' +
        '</div>');
    Insert.append(SugarBody.body(), page);
    var checkChild = function (expected, path) {
        var element = Hierarchy.follow(page, path).getOrDie('Could not find path: ' + path.join(','));
        var actual = ElementAddress.childOf(element, page).getOrDie('Expected to find in line to ancestor');
        bedrock_client_1.Assert.eq('eq', expected, toStr(actual));
    };
    var toStr = function (element) {
        if (SugarNode.isElement(element) && Attribute.has(element, 'id')) {
            return SugarNode.name(element) + '#' + Attribute.get(element, 'id');
        }
        else if (SugarNode.name(element) === 'td' || SugarNode.name(element) === 'th') {
            return Html.getOuter(element);
        }
        else {
            return SugarNode.name(element);
        }
    };
    // page > table > thead > tr > th
    checkChild('table', [1, 0, 0, 0]);
    // page > table
    checkChild('table', [1]);
    // page > p
    checkChild('p#p2', [2]);
    // page > p
    checkChild('p#p1', [0]);
    // page > p > span > word
    checkChild('p#p1', [0, 1, 0]);
    var checkInParentOfSelector = function (expected, startPath, selector) {
        var element = Hierarchy.follow(page, startPath).getOrDie('Could not find: ' + startPath);
        var actual = ElementAddress.selectorsInParent(element, selector).getOrDie('None for inParent');
        bedrock_client_1.Assert.eq('eq', expected.parent, toStr(actual.parent));
        bedrock_client_1.Assert.eq('eq', expected.children, katamari_1.Arr.map(actual.children, toStr));
        bedrock_client_1.Assert.eq('eq', expected.element, toStr(actual.element));
        bedrock_client_1.Assert.eq('eq', expected.index, actual.index);
    };
    var checkInParentOfAny = function (expected, startPath) {
        var element = Hierarchy.follow(page, startPath).getOrDie('Could not find: ' + startPath);
        var actual = ElementAddress.indexInParent(element).getOrDie('None for inParent');
        bedrock_client_1.Assert.eq('eq', expected.parent, toStr(actual.parent));
        bedrock_client_1.Assert.eq('eq', expected.children, katamari_1.Arr.map(actual.children, toStr));
        bedrock_client_1.Assert.eq('eq', expected.element, toStr(actual.element));
        bedrock_client_1.Assert.eq('eq', expected.index, actual.index);
    };
    var checkNoneInParentOfSelector = function (startPath, ancestorSelector) {
        var element = Hierarchy.follow(page, startPath).getOrDie('Could not find: ' + startPath);
        var actual = ElementAddress.selectorsInParent(element, ancestorSelector);
        katamari_assertions_1.KAssert.eqNone('should be none', actual);
    };
    checkInParentOfSelector({
        parent: 'p#p1',
        children: ['span#s1', 'span#s2', 'span#s3'],
        element: 'span#s1',
        index: 0
    }, [0, 1], 'span');
    checkInParentOfSelector({
        parent: 'p#p1',
        children: ['span#s1', 'span#s2', 'span#s3'],
        element: 'span#s2',
        index: 1
    }, [0, 3], 'span');
    checkInParentOfSelector({
        parent: 'tr',
        children: ['<td>A1</td>', '<td>B1</td>', '<td>C1</td>'],
        element: '<td>C1</td>',
        index: 2
    }, [1, 1, 1, 2], 'td');
    checkNoneInParentOfSelector([1, 1, 1, 2], 'th');
    checkInParentOfAny({
        parent: 'p#p1',
        children: ['#text', 'span#s1', '#text', 'span#s2', '#text', 'span#s3', '#text'],
        element: 'span#s2',
        index: 3
    }, [0, 3]);
    var checkInAncestorOfSelector = function (expected, startPath, ancestorSelector, descendantSelector) {
        var element = Hierarchy.follow(page, startPath).getOrDie('Could not find: ' + startPath);
        var actual = ElementAddress.descendantsInAncestor(element, ancestorSelector, descendantSelector).getOrDie('None for inAncestor');
        bedrock_client_1.Assert.eq('eq', expected.ancestor, toStr(actual.ancestor));
        bedrock_client_1.Assert.eq('eq', expected.descendants, katamari_1.Arr.map(actual.descendants, toStr));
        bedrock_client_1.Assert.eq('eq', expected.element, toStr(actual.element));
        bedrock_client_1.Assert.eq('eq', expected.index, actual.index);
    };
    var checkNoneInAncestorOfSelector = function (startPath, ancestorSelector, descendantSelector) {
        var element = Hierarchy.follow(page, startPath).getOrDie('Could not find: ' + startPath);
        var actual = ElementAddress.descendantsInAncestor(element, ancestorSelector, descendantSelector);
        katamari_assertions_1.KAssert.eqNone('should be none', actual);
    };
    checkInAncestorOfSelector({
        ancestor: 'table',
        descendants: ['<th>Name</th>', '<th>Occupation</th>', '<th>Entitlement</th>', '<th>A</th>', '<th>B</th>', '<th>C</th>'],
        element: '<th>B</th>',
        index: 4
    }, [1, 1, 0, 1], 'table', 'th');
    checkInAncestorOfSelector({
        ancestor: 'tbody',
        descendants: ['<th>A</th>', '<th>B</th>', '<th>C</th>'],
        element: '<th>B</th>',
        index: 1
    }, [1, 1, 0, 1], 'tbody', 'th');
    checkInAncestorOfSelector({
        ancestor: 'thead',
        descendants: ['<th>Name</th>', '<th>Occupation</th>', '<th>Entitlement</th>'],
        element: '<th>Entitlement</th>',
        index: 2
    }, [1, 0, 0, 2], 'thead', 'th');
    checkNoneInAncestorOfSelector([1, 1, 0, 2], 'thead', 'th');
    (function () {
        var alpha = SugarElement_1.SugarElement.fromTag('div');
        var beta = SugarElement_1.SugarElement.fromTag('div');
        var gamma = SugarElement_1.SugarElement.fromTag('div');
        katamari_assertions_1.KAssert.eqNone('Expected nothing in list.', ElementAddress.indexOf([], alpha));
        katamari_assertions_1.KAssert.eqSome('alpha indexOf([alpha]) = 0', 0, ElementAddress.indexOf([alpha], alpha));
        katamari_assertions_1.KAssert.eqNone('Alpha not in list [beta]', ElementAddress.indexOf([beta], alpha));
        katamari_assertions_1.KAssert.eqSome('beta indexOf([alpha,beta]) = 1', 1, ElementAddress.indexOf([alpha, beta], beta));
        katamari_assertions_1.KAssert.eqSome('gamma indexOf([alpha,beta,gamma]) = 1', 2, ElementAddress.indexOf([alpha, beta, gamma], gamma));
        katamari_assertions_1.KAssert.eqSome('beta indexOf([alpha,beta,gamma]) = 1', 1, ElementAddress.indexOf([alpha, beta, gamma], beta));
    })();
    Remove.remove(page);
});
//# sourceMappingURL=ElementAddressTest.js.map