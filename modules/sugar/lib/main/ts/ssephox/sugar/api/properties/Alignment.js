"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAlignment = void 0;
var katamari_1 = require("@ssephox/katamari");
var Node = require("../node/SugarNode");
var Css = require("./Css");
var Direction = require("./Direction");
var normal = function (value) { return function (_element) {
    return value;
}; };
var lookups = {
    'start': Direction.onDirection('left', 'right'),
    'end': Direction.onDirection('right', 'left'),
    'justify': normal('justify'),
    'center': normal('center'),
    'match-parent': normal('match-parent')
};
var getAlignment = function (element, property) {
    var raw = Css.get(element, property);
    return katamari_1.Obj.get(lookups, raw)
        .map(function (f) { return f(element); })
        .getOr(raw);
};
var hasAlignment = function (element, property, value) {
    return Node.isText(element) ? false : getAlignment(element, property) === value;
};
exports.hasAlignment = hasAlignment;
//# sourceMappingURL=Alignment.js.map