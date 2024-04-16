import * as PlatformDetection from "ssephox/sand/api/PlatformDetection";
const platform = PlatformDetection.detect();
const ephoxUi = document.querySelector("#ssephox-ui");
ephoxUi.innerHTML = "You are using: " + platform.browser.current;
//# sourceMappingURL=Demo.js.map