"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var chai_1 = require("chai");
var Version_1 = require("ssephox/sand/detect/Version");
(0, bedrock_client_1.describe)('VersionDetectorTest', function () {
    var edgeRegex = /.*?edge\/ ?([0-9]+)\.([0-9]+)$/;
    var check = function (expected, versionRegexes, agent) {
        var actual = Version_1.Version.detect(versionRegexes, agent);
        chai_1.assert.deepEqual(expected, actual);
    };
    (0, bedrock_client_1.it)('Empty string', function () {
        check({ major: 0, minor: 0 }, [], '');
    });
    (0, bedrock_client_1.it)('Edge 12.0', function () {
        check({ major: 12, minor: 0 }, [edgeRegex], 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0');
    });
});
//# sourceMappingURL=VersionDetectorTest.js.map