"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var Resize = require("ssephox/sugar/api/events/Resize");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Monitors = require("ssephox/sugar/impl/Monitors");
bedrock_client_1.UnitTest.asynctest('ResizeRaceTest', function (success, failure) {
    var div = SugarElement_1.SugarElement.fromTag('div');
    Insert.append(SugarBody.body(), div);
    var handler = katamari_1.Fun.noop;
    Resize.bind(div, handler);
    Remove.remove(div);
    Resize.unbind(div, handler);
    setTimeout(function () {
        if (Monitors.query(div).isSome()) {
            failure('Monitor added to div after resize was unbound');
        }
        else {
            success();
        }
    }, 150); // assumes the resize code still uses 100
});
//# sourceMappingURL=ResizeRaceTest.js.map