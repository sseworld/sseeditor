"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.add = exports.read = void 0;
var katamari_1 = require("@ssephox/katamari");
var Attribute = require("./Attribute");
// Methods for handling attributes that contain a list of values <div foo="alpha beta theta">
var read = function (element, attr) {
    var value = Attribute.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
};
exports.read = read;
var add = function (element, attr, id) {
    var old = read(element, attr);
    var nu = old.concat([id]);
    Attribute.set(element, attr, nu.join(' '));
    return true;
};
exports.add = add;
var remove = function (element, attr, id) {
    var nu = katamari_1.Arr.filter(read(element, attr), function (v) { return v !== id; });
    if (nu.length > 0) {
        Attribute.set(element, attr, nu.join(' '));
    }
    else {
        Attribute.remove(element, attr);
    }
    return false;
};
exports.remove = remove;
//# sourceMappingURL=AttrList.js.map