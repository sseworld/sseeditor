"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlatformDetection = require("ssephox/sand/api/PlatformDetection");
var platform = PlatformDetection.detect();
var ephoxUi = document.querySelector("#ssephox-ui");
ephoxUi.innerHTML = "You are using: " + platform.browser.current;
//# sourceMappingURL=Demo.js.map