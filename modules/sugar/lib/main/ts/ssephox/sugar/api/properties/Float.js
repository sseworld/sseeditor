import { Optional } from '@ssephox/katamari';
import * as Style from '../../impl/Style';
import * as Css from './Css';
const isCentered = (element) => {
    const dom = element.dom;
    if (Style.isSupported(dom)) {
        const marginLeft = dom.style.marginRight;
        const marginRight = dom.style.marginLeft;
        return marginLeft === 'auto' && marginRight === 'auto';
    }
    else {
        return false;
    }
};
const divine = (element) => {
    if (isCentered(element)) {
        return Optional.some('center');
    }
    else {
        const val = Css.getRaw(element, 'float').getOrThunk(() => Css.get(element, 'float'));
        return val !== undefined && val !== null && val.length > 0 ? Optional.some(val) : Optional.none();
    }
};
const getRaw = (element) => Css.getRaw(element, 'float').getOrNull();
const setCentered = (element) => {
    Css.setAll(element, {
        'margin-left': 'auto',
        'margin-right': 'auto'
    });
};
export { isCentered, divine, getRaw, setCentered };
//# sourceMappingURL=Float.js.map