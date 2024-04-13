"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCentered = exports.getRaw = exports.divine = exports.isCentered = void 0;
var katamari_1 = require("@ssephox/katamari");
var Style = require("../../impl/Style");
var Css = require("./Css");
var isCentered = function (element) {
    var dom = element.dom;
    if (Style.isSupported(dom)) {
        var marginLeft = dom.style.marginRight;
        var marginRight = dom.style.marginLeft;
        return marginLeft === 'auto' && marginRight === 'auto';
    }
    else {
        return false;
    }
};
exports.isCentered = isCentered;
var divine = function (element) {
    if (isCentered(element)) {
        return katamari_1.Optional.some('center');
    }
    else {
        var val = Css.getRaw(element, 'float').getOrThunk(function () { return Css.get(element, 'float'); });
        return val !== undefined && val !== null && val.length > 0 ? katamari_1.Optional.some(val) : katamari_1.Optional.none();
    }
};
exports.divine = divine;
var getRaw = function (element) {
    return Css.getRaw(element, 'float').getOrNull();
};
exports.getRaw = getRaw;
var setCentered = function (element) {
    Css.setAll(element, {
        'margin-left': 'auto',
        'margin-right': 'auto'
    });
};
exports.setCentered = setCentered;
//# sourceMappingURL=Float.js.map