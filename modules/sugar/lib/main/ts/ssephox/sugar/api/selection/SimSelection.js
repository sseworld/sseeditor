import { Adt } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
import * as Traverse from '../search/Traverse';
import { SimRange } from './SimRange';
import { Situ } from './Situ';
// Consider adding a type for "element"
const adt = Adt.generate([
    { domRange: ['rng'] },
    { relative: ['startSitu', 'finishSitu'] },
    { exact: ['start', 'soffset', 'finish', 'foffset'] }
]);
const exactFromRange = (simRange) => adt.exact(simRange.start, simRange.soffset, simRange.finish, simRange.foffset);
const getStart = (selection) => selection.match({
    domRange: (rng) => SugarElement.fromDom(rng.startContainer),
    relative: (startSitu, _finishSitu) => Situ.getStart(startSitu),
    exact: (start, _soffset, _finish, _foffset) => start
});
const domRange = adt.domRange;
const relative = adt.relative;
const exact = adt.exact;
const getWin = (selection) => {
    const start = getStart(selection);
    return Traverse.defaultView(start);
};
// This is out of place but it's API so I can't remove it
const range = SimRange.create;
// tslint:disable-next-line:variable-name
export const SimSelection = {
    domRange,
    relative,
    exact,
    exactFromRange,
    getWin,
    range
};
//# sourceMappingURL=SimSelection.js.map