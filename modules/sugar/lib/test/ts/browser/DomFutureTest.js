import { Assert, UnitTest } from '@ephox/bedrock-client';
import * as Compare from 'ssephox/sugar/api/dom/Compare';
import * as DomFuture from 'ssephox/sugar/api/dom/DomFuture';
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
UnitTest.asynctest('Browser Test: .DomFutureTest', (success) => {
    const testElement = SugarElement.fromTag('button');
    DomFuture.waitFor(testElement, 'click', 1000).get((res) => {
        Assert.eq('Result should be error as click has not yet occurred.', true, res.isError());
        DomFuture.waitFor(testElement, 'click', 1000).get((r) => {
            r.fold((err) => {
                Assert.fail('Future should have returned value(event). Instead returned error(' + err + ')');
            }, (val) => {
                Assert.eq('Checking that the target of the event is correct', true, Compare.eq(testElement, val.target));
                success();
            });
        });
        // TODO: test timeout on click
        testElement.dom.click();
    });
});
//# sourceMappingURL=DomFutureTest.js.map