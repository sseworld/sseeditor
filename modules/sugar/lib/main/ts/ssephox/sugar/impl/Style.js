import { Type } from '@ssephox/katamari';
// some elements, such as mathml, don't have style attributes
// others, such as angular elements, have style attributes that aren't a CSSStyleDeclaration
const isSupported = (dom) => 
// eslint-disable-next-line @typescript-eslint/unbound-method
dom.style !== undefined && Type.isFunction(dom.style.getPropertyValue);
export { isSupported };
//# sourceMappingURL=Style.js.map