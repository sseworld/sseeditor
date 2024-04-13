"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutate = exports.copy = exports.deep = exports.shallowAs = exports.shallow = void 0;
var SugarElement_1 = require("../node/SugarElement");
var Attribute = require("../properties/Attribute");
var Traverse = require("../search/Traverse");
var Insert = require("./Insert");
var InsertAll = require("./InsertAll");
var Remove = require("./Remove");
var clone = function (original, isDeep) {
    return SugarElement_1.SugarElement.fromDom(original.dom.cloneNode(isDeep));
};
/** Shallow clone - just the tag, no children */
var shallow = function (original) {
    return clone(original, false);
};
exports.shallow = shallow;
/** Deep clone - everything copied including children */
var deep = function (original) {
    return clone(original, true);
};
exports.deep = deep;
/** Shallow clone, with a new tag */
var shallowAs = function (original, tag) {
    var nu = SugarElement_1.SugarElement.fromTag(tag);
    var attributes = Attribute.clone(original);
    Attribute.setAll(nu, attributes);
    return nu;
};
exports.shallowAs = shallowAs;
/** Deep clone, with a new tag */
var copy = function (original, tag) {
    var nu = shallowAs(original, tag);
    // NOTE
    // previously this used serialisation:
    // nu.dom.innerHTML = original.dom.innerHTML;
    //
    // Clone should be equivalent (and faster), but if TD <-> TH toggle breaks, put it back.
    var cloneChildren = Traverse.children(deep(original));
    InsertAll.append(nu, cloneChildren);
    return nu;
};
exports.copy = copy;
/** Change the tag name, but keep all children */
var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    Insert.after(original, nu);
    var children = Traverse.children(original);
    InsertAll.append(nu, children);
    Remove.remove(original);
    return nu;
};
exports.mutate = mutate;
//# sourceMappingURL=Replication.js.map