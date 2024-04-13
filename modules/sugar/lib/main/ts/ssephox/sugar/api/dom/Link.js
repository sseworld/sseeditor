"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStylesheet = void 0;
var SugarElement_1 = require("../node/SugarElement");
var SugarHead = require("../node/SugarHead");
var Attribute = require("../properties/Attribute");
var Insert = require("./Insert");
var addToHead = function (doc, tag) {
    var head = SugarHead.getHead(doc);
    Insert.append(head, tag);
};
var addStylesheet = function (url, scope) {
    var doc = scope || SugarElement_1.SugarElement.fromDom(document);
    var link = SugarElement_1.SugarElement.fromTag('link', doc.dom); // We really need to fix that SugarElement API
    Attribute.setAll(link, {
        rel: 'stylesheet',
        type: 'text/css',
        href: url
    });
    addToHead(doc, link);
    return link;
};
exports.addStylesheet = addStylesheet;
//# sourceMappingURL=Link.js.map