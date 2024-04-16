import { Arr } from '@ssephox/katamari';
import { SugarElement } from './SugarElement';
const fromElements = (elements, scope) => {
    const doc = scope || document;
    const fragment = doc.createDocumentFragment();
    Arr.each(elements, (element) => {
        fragment.appendChild(element.dom);
    });
    return SugarElement.fromDom(fragment);
};
export { fromElements };
//# sourceMappingURL=SugarFragment.js.map