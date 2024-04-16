import { Adt } from '@ssephox/katamari';
const adt = Adt.generate([
    { include: ['item'] },
    { excludeWith: ['item'] },
    { excludeWithout: ['item'] }
]);
const cata = (subject, onInclude, onExcludeWith, onExcludeWithout) => {
    return subject.fold(onInclude, onExcludeWith, onExcludeWithout);
};
export const Splitting = {
    include: adt.include,
    excludeWith: adt.excludeWith,
    excludeWithout: adt.excludeWithout,
    cata
};
//# sourceMappingURL=Splitting.js.map