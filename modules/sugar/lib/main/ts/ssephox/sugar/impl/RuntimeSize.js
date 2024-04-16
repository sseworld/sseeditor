import { Strings } from '@ssephox/katamari';
import * as Css from '../api/properties/Css';
const toNumber = (px, fallback) => Strings.toFloat(px).getOr(fallback);
const getProp = (element, name, fallback) => toNumber(Css.get(element, name), fallback);
const calcContentBoxSize = (element, size, upper, lower) => {
    const paddingUpper = getProp(element, `padding-${upper}`, 0);
    const paddingLower = getProp(element, `padding-${lower}`, 0);
    const borderUpper = getProp(element, `border-${upper}-width`, 0);
    const borderLower = getProp(element, `border-${lower}-width`, 0);
    return size - paddingUpper - paddingLower - borderUpper - borderLower;
};
const getCalculatedHeight = (element, boxSizing) => {
    const dom = element.dom;
    const height = dom.getBoundingClientRect().height || dom.offsetHeight;
    return boxSizing === 'border-box' ? height : calcContentBoxSize(element, height, 'top', 'bottom');
};
const getCalculatedWidth = (element, boxSizing) => {
    const dom = element.dom;
    const width = dom.getBoundingClientRect().width || dom.offsetWidth;
    return boxSizing === 'border-box' ? width : calcContentBoxSize(element, width, 'left', 'right');
};
const getHeight = (element) => getProp(element, 'height', element.dom.offsetHeight);
const getWidth = (element) => getProp(element, 'width', element.dom.offsetWidth);
const getInnerHeight = (element) => getCalculatedHeight(element, 'content-box');
const getInnerWidth = (element) => getCalculatedWidth(element, 'content-box');
export { getInnerHeight, getInnerWidth, getHeight, getWidth };
//# sourceMappingURL=RuntimeSize.js.map