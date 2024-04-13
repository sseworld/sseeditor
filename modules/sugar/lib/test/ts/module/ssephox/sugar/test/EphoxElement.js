"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
exports.default = (function (type) {
    var dom = document.createElement(type);
    return SugarElement_1.SugarElement.fromDom(dom);
});
//# sourceMappingURL=EphoxElement.js.map