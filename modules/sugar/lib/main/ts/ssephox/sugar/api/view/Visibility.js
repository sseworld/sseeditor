import { Fun } from '@ssephox/katamari';
import * as Css from '../properties/Css';
import { Toggler } from '../properties/Toggler';
// This function is dangerous. Toggle behaviour is different depending on whether the element is in the DOM or not when it's created.
const visibilityToggler = (element, property, hiddenValue, visibleValue) => {
    let initial = Css.get(element, property);
    // old jquery-ism that this function depends on
    if (initial === undefined) {
        initial = '';
    }
    const value = initial === hiddenValue ? visibleValue : hiddenValue;
    const off = Fun.curry(Css.set, element, property, initial);
    const on = Fun.curry(Css.set, element, property, value);
    return Toggler(off, on, false);
};
const toggler = (element) => visibilityToggler(element, 'visibility', 'hidden', 'visible');
const displayToggler = (element, value) => visibilityToggler(element, 'display', 'none', value);
const isHidden = (dom) => dom.offsetWidth <= 0 && dom.offsetHeight <= 0;
const isVisible = (element) => !isHidden(element.dom);
export { toggler, displayToggler, isVisible };
//# sourceMappingURL=Visibility.js.map