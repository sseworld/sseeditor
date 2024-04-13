"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocument = void 0;
var SugarElement_1 = require("./SugarElement");
var getDocument = function () {
    return SugarElement_1.SugarElement.fromDom(document);
};
exports.getDocument = getDocument;
//# sourceMappingURL=SugarDocument.js.map