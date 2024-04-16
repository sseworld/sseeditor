import { describe, it } from '@ephox/bedrock-client';
import { assert } from 'chai';
import { Version } from 'ssephox/sand/detect/Version';
describe('VersionDetectorTest', () => {
    const edgeRegex = /.*?edge\/ ?([0-9]+)\.([0-9]+)$/;
    const check = (expected, versionRegexes, agent) => {
        const actual = Version.detect(versionRegexes, agent);
        assert.deepEqual(expected, actual);
    };
    it('Empty string', () => {
        check({ major: 0, minor: 0 }, [], '');
    });
    it('Edge 12.0', () => {
        check({ major: 12, minor: 0 }, [edgeRegex], 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0');
    });
});
//# sourceMappingURL=VersionDetectorTest.js.map