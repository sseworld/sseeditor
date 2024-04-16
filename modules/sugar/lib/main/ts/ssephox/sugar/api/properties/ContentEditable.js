import { Fun } from '@ssephox/katamari';
import * as SugarBody from '../node/SugarBody';
import * as SelectorFind from '../search/SelectorFind';
const closest = (target) => SelectorFind.closest(target, '[contenteditable]');
const isEditable = (element, assumeEditable = false) => {
    if (SugarBody.inBody(element)) {
        return element.dom.isContentEditable;
    }
    else {
        // Find the closest contenteditable element and check if it's editable
        return closest(element).fold(Fun.constant(assumeEditable), (editable) => getRaw(editable) === 'true');
    }
};
const getRaw = (element) => element.dom.contentEditable;
const get = (element) => isEditable(element, false);
const set = (element, editable) => {
    element.dom.contentEditable = editable ? 'true' : 'false';
};
export { get, getRaw, closest, isEditable, set };
//# sourceMappingURL=ContentEditable.js.map