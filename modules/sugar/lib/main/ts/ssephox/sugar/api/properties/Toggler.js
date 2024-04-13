"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggler = void 0;
var Toggler = function (turnOff, turnOn, initial) {
    var active = initial || false;
    var on = function () {
        turnOn();
        active = true;
    };
    var off = function () {
        turnOff();
        active = false;
    };
    var toggle = function () {
        var f = active ? off : on;
        f();
    };
    var isOn = function () { return active; };
    return {
        on: on,
        off: off,
        toggle: toggle,
        isOn: isOn
    };
};
exports.Toggler = Toggler;
//# sourceMappingURL=Toggler.js.map