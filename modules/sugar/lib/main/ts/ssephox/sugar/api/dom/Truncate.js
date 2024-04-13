"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtml = void 0;
var SugarShadowDom = require("../node/SugarShadowDom");
var Html = require("../properties/Html");
var Replication = require("./Replication");
var getHtml = function (element) {
    if (SugarShadowDom.isShadowRoot(element)) {
        return '#shadow-root';
    }
    else {
        var clone = Replication.shallow(element);
        return Html.getOuter(clone);
    }
};
exports.getHtml = getHtml;
//# sourceMappingURL=Truncate.js.map