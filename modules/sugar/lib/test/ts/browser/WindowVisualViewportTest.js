"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var sand_1 = require("@ssephox/sand");
var WindowVisualViewport = require("ssephox/sugar/api/view/WindowVisualViewport");
bedrock_client_1.UnitTest.test('WindowVisualViewport.getBounds', function () {
    var deviceType = sand_1.PlatformDetection.detect().deviceType;
    if (deviceType.isDesktop()) {
        var bounds = WindowVisualViewport.getBounds();
        bedrock_client_1.Assert.eq('Top is 0', 0, bounds.y);
        bedrock_client_1.Assert.eq('Left is 0', 0, bounds.x);
        bedrock_client_1.Assert.eq('Height is the same as the document height', document.documentElement.clientHeight, bounds.height);
        bedrock_client_1.Assert.eq('Width is the same as the document width', document.documentElement.clientWidth, bounds.width);
    }
});
bedrock_client_1.UnitTest.test('WindowVisualViewport.bind', function () {
    var resizeCount = 0;
    var binder = WindowVisualViewport.bind('resize', function () {
        resizeCount += 1;
    });
    // Trigger resize
    WindowVisualViewport.get().each(function (viewport) {
        var resizeEvent = new UIEvent('resize');
        viewport.dispatchEvent(resizeEvent);
        bedrock_client_1.Assert.eq('Check resize event handled', 1, resizeCount);
    });
    binder.unbind();
});
//# sourceMappingURL=WindowVisualViewportTest.js.map