import { Assert, UnitTest } from '@ephox/bedrock-client';
import { Fun, Optional } from '@ssephox/katamari';
import * as Compare from 'ssephox/sugar/api/dom/Compare';
import * as Remove from 'ssephox/sugar/api/dom/Remove';
import * as PredicateExists from 'ssephox/sugar/api/search/PredicateExists';
import * as PredicateFilter from 'ssephox/sugar/api/search/PredicateFilter';
import * as PredicateFind from 'ssephox/sugar/api/search/PredicateFind';
import * as SelectorExists from 'ssephox/sugar/api/search/SelectorExists';
import * as SelectorFilter from 'ssephox/sugar/api/search/SelectorFilter';
import * as SelectorFind from 'ssephox/sugar/api/search/SelectorFind';
import * as Traverse from 'ssephox/sugar/api/search/Traverse';
import * as Checkers from 'ssephox/sugar/test/Checkers';
import * as TestPage from 'ssephox/sugar/test/TestPage';
UnitTest.test('IsRootTest', () => {
    TestPage.connect(); // description of structure is in TestPage
    const isRoot = (e) => Compare.eq(TestPage.d1, e);
    const checkNone = (optElement) => Checkers.checkOpt(Optional.none(), optElement);
    checkNone(SelectorFind.ancestor(TestPage.t6, 'li', isRoot));
    checkNone(SelectorFind.ancestor(TestPage.t6, 'ol,ul', isRoot));
    checkNone(PredicateFind.ancestor(TestPage.t6, Checkers.isName('li'), isRoot));
    Checkers.checkOpt(Optional.some(TestPage.d1), SelectorFind.ancestor(TestPage.t6, 'div', isRoot));
    Checkers.checkOpt(Optional.some(TestPage.d1), PredicateFind.ancestor(TestPage.t6, Checkers.isName('div'), isRoot));
    checkNone(SelectorFind.closest(TestPage.t6, 'li', isRoot));
    checkNone(SelectorFind.closest(TestPage.t6, 'ol,ul', isRoot));
    checkNone(SelectorFind.closest(TestPage.d1, 'ol,ul', isRoot));
    checkNone(PredicateFind.closest(TestPage.t6, Checkers.isName('li'), isRoot));
    checkNone(PredicateFind.closest(TestPage.d1, Checkers.isName('li'), isRoot));
    Checkers.checkOpt(Optional.some(TestPage.d1), SelectorFind.closest(TestPage.t6, 'div', isRoot));
    Checkers.checkOpt(Optional.some(TestPage.d1), SelectorFind.closest(TestPage.d1, 'div', isRoot));
    Checkers.checkOpt(Optional.some(TestPage.d1), PredicateFind.closest(TestPage.t6, Checkers.isName('div'), isRoot));
    Checkers.checkOpt(Optional.some(TestPage.d1), PredicateFind.closest(TestPage.d1, Checkers.isName('div'), isRoot));
    Checkers.checkList([TestPage.d1], SelectorFilter.ancestors(TestPage.p3, '*', isRoot));
    Checkers.checkList([TestPage.d1], PredicateFilter.ancestors(TestPage.p3, Fun.always, isRoot));
    Assert.eq('', false, SelectorExists.closest(TestPage.p3, 'li', isRoot));
    Assert.eq('', false, SelectorExists.closest(TestPage.p3, 'ol,ul', isRoot));
    Assert.eq('', false, PredicateExists.closest(TestPage.p3, Checkers.isName('li'), isRoot));
    Assert.eq('', true, SelectorExists.closest(TestPage.p3, 'div', isRoot));
    Assert.eq('', true, SelectorExists.closest(TestPage.d1, 'div', isRoot));
    Assert.eq('', true, PredicateExists.closest(TestPage.p3, Checkers.isName('div'), isRoot));
    Assert.eq('', true, PredicateExists.closest(TestPage.d1, Checkers.isName('div'), isRoot));
    Assert.eq('', false, SelectorExists.ancestor(TestPage.p3, 'li', isRoot));
    Assert.eq('', false, SelectorExists.ancestor(TestPage.p3, 'ol,ul', isRoot));
    Assert.eq('', false, PredicateExists.ancestor(TestPage.p3, Checkers.isName('li'), isRoot));
    Assert.eq('', true, SelectorExists.ancestor(TestPage.p3, 'div', isRoot));
    Assert.eq('', true, PredicateExists.ancestor(TestPage.p3, Checkers.isName('div'), isRoot));
    Checkers.checkList([TestPage.d1], Traverse.parents(TestPage.p3, isRoot));
    Checkers.checkList([TestPage.p3, TestPage.d1], Traverse.parents(TestPage.t6, isRoot));
    Remove.remove(TestPage.container);
});
//# sourceMappingURL=IsRootTest.js.map