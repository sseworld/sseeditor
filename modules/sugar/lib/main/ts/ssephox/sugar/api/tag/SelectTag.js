"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSelected = exports.addAll = exports.add = exports.getValue = void 0;
var katamari_1 = require("@ssephox/katamari");
var getValueFromIndex = function (options, index) {
    return katamari_1.Arr.get(options, index).bind(function (optionVal) { return katamari_1.Optional.from(optionVal.value); });
};
var getValue = function (select) {
    var selectDom = select.dom;
    return getValueFromIndex(selectDom.options, selectDom.selectedIndex);
};
exports.getValue = getValue;
var add = function (select, option) {
    select.dom.add(option.dom);
};
exports.add = add;
var addAll = function (select, options) {
    katamari_1.Arr.each(options, function (option) {
        add(select, option);
    });
};
exports.addAll = addAll;
var setSelected = function (select, index) {
    select.dom.selectedIndex = index;
};
exports.setSelected = setSelected;
//# sourceMappingURL=SelectTag.js.map