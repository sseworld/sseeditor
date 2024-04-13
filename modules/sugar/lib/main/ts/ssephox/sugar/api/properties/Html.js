"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOuter = exports.set = exports.get = void 0;
var Insert = require("../dom/Insert");
var InsertAll = require("../dom/InsertAll");
var Remove = require("../dom/Remove");
var SugarElement_1 = require("../node/SugarElement");
var SugarElements = require("../node/SugarElements");
var Traverse = require("../search/Traverse");
var get = function (element) {
    return element.dom.innerHTML;
};
exports.get = get;
var set = function (element, content) {
    var owner = Traverse.owner(element);
    var docDom = owner.dom;
    // FireFox has *terrible* performance when using innerHTML = x
    var fragment = SugarElement_1.SugarElement.fromDom(docDom.createDocumentFragment());
    var contentElements = SugarElements.fromHtml(content, docDom);
    InsertAll.append(fragment, contentElements);
    Remove.empty(element);
    Insert.append(element, fragment);
};
exports.set = set;
var getOuter = function (element) {
    var container = SugarElement_1.SugarElement.fromTag('div');
    var clone = SugarElement_1.SugarElement.fromDom(element.dom.cloneNode(true));
    Insert.append(container, clone);
    return get(container);
};
exports.getOuter = getOuter;
//# sourceMappingURL=Html.js.map