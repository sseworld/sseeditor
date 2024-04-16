import { Adt, Fun } from '@ssephox/katamari';
const adt = Adt.generate([
    { before: ['element'] },
    { on: ['element', 'offset'] },
    { after: ['element'] }
]);
// Probably don't need this given that we now have "match"
const cata = (subject, onBefore, onOn, onAfter) => subject.fold(onBefore, onOn, onAfter);
const getStart = (situ) => situ.fold(Fun.identity, Fun.identity, Fun.identity);
const before = adt.before;
const on = adt.on;
const after = adt.after;
// tslint:disable-next-line:variable-name
export const Situ = {
    before,
    on,
    after,
    cata,
    getStart
};
//# sourceMappingURL=Situ.js.map