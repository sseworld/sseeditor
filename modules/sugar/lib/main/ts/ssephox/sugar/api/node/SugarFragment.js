"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromElements = void 0;
var katamari_1 = require("@ssephox/katamari");
var SugarElement_1 = require("./SugarElement");
var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    katamari_1.Arr.each(elements, function (element) {
        fragment.appendChild(element.dom);
    });
    return SugarElement_1.SugarElement.fromDom(fragment);
};
exports.fromElements = fromElements;
//# sourceMappingURL=SugarFragment.js.map