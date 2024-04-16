import { Assert, UnitTest } from '@ephox/bedrock-client';
import * as Replication from 'ssephox/sugar/api/dom/Replication';
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
import * as Traverse from 'ssephox/sugar/api/search/Traverse';
UnitTest.test('ReplicationTest', () => {
    const checkValues = (expected, actual) => {
        Assert.eq('', expected.name, 'span');
        Assert.eq('', expected.attrs.href, actual.dom.getAttribute('href'));
        Assert.eq('', expected.attrs['data-color'], actual.dom.getAttribute('data-color'));
        Assert.eq('', expected.styles.margin, actual.dom.style.getPropertyValue('margin'));
        Assert.eq('', expected.styles.padding, actual.dom.style.getPropertyValue('padding'));
    };
    const checkCopy = (expected, input) => {
        const initial = SugarElement.fromHtml(input);
        const actual = Replication.copy(initial, 'span');
        checkValues(expected, actual);
    };
    const checkMutate = (expected, input) => {
        const initial = SugarElement.fromHtml(input);
        const actual = Replication.mutate(initial, 'span');
        // mutate destroys the original element
        Assert.eq('', 0, Traverse.children(initial).length);
        checkValues(expected, actual);
    };
    const check = (expected, input) => {
        checkCopy(expected, input);
        checkMutate(expected, input);
    };
    const exp = {
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