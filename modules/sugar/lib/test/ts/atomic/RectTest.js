"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var chai_1 = require("chai");
var fc = require("fast-check");
var Rect_1 = require("ssephox/sugar/api/selection/Rect");
bedrock_client_1.UnitTest.test('Rect', function () {
    fc.assert(fc.property(fc.float(), fc.float(), fc.float(), fc.float(), fc.float(), fc.float(), function (left, right, top, bottom, width, height) {
        return chai_1.assert.deepEqual({
            left: left,
            top: top,
            right: right,
            bottom: bottom,
            width: width,
            height: height
        }, Rect_1.Rect.toRaw({
            left: function () { return left; },
            top: function () { return top; },
            right: function () { return right; },
            bottom: function () { return bottom; },
            width: function () { return width; },
            height: function () { return height; }
        }));
    }));
});
//# sourceMappingURL=RectTest.js.map