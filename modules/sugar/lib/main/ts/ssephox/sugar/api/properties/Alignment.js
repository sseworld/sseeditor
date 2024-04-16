import { Obj } from '@ssephox/katamari';
import * as Node from '../node/SugarNode';
import * as Css from './Css';
import * as Direction from './Direction';
const normal = (value) => (_element) => value;
const lookups = {
    'start': Direction.onDirection('left', 'right'),
    'end': Direction.onDirection('right', 'left'),
    'justify': normal('justify'),
    'center': normal('center'),
    'match-parent': normal('match-parent')
};
const getAlignment = (element, property) => {
    const raw = Css.get(element, property);
    return Obj.get(lookups, raw)
        .map((f) => f(element))
        .getOr(raw);
};
const hasAlignment = (element, property, value) => Node.isText(element) ? false : getAlignment(element, property) === value;
export { hasAlignment };
//# sourceMappingURL=Alignment.js.map