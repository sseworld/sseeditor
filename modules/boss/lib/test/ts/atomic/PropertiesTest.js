import { Assert, UnitTest } from '@ephox/bedrock-client';
import { CommentGene } from 'ssephox/boss/api/CommentGene';
import { Gene } from 'ssephox/boss/api/Gene';
import { TextGene } from 'ssephox/boss/api/TextGene';
import * as Properties from 'ssephox/boss/mutant/Properties';
UnitTest.test('PropertiesTest', () => {
    const g = Gene('root', 'root', []);
    const t = TextGene('-gene-', 'post-image text');
    const c = CommentGene('-comment-', 'comment');
    const check = (expected, element, pred) => {
        Assert.eq('', expected, pred(element));
    };
    check(true, g, Properties.isElement);
    check(false, t, Properties.isElement);
    check(false, c, Properties.isElement);
    check(false, g, Properties.isText);
    check(true, t, Properties.isText);
    check(false, c, Properties.isText);
    check(false, g, Properties.isComment);
    check(false, t, Properties.isComment);
    check(true, c, Properties.isComment);
});
//# sourceMappingURL=PropertiesTest.js.map