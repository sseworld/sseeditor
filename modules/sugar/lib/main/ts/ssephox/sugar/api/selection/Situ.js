"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Situ = void 0;
var katamari_1 = require("@ssephox/katamari");
var adt = katamari_1.Adt.generate([
    { before: ['element'] },
    { on: ['element', 'offset'] },
    { after: ['element'] }
]);
// Probably don't need this given that we now have "match"
var cata = function (subject, onBefore, onOn, onAfter) {
    return subject.fold(onBefore, onOn, onAfter);
};
var getStart = function (situ) {
    return situ.fold(katamari_1.Fun.identity, katamari_1.Fun.identity, katamari_1.Fun.identity);
};
var before = adt.before;
var on = adt.on;
var after = adt.after;
// tslint:disable-next-line:variable-name
exports.Situ = {
    before: before,
    on: on,
    after: after,
    cata: cata,
    getStart: getStart
};
//# sourceMappingURL=Situ.js.map