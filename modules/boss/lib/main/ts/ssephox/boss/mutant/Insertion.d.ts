import { Gene } from '../api/Gene';
declare const before: (anchor: Gene, item: Gene) => void;
declare const after: (anchor: Gene, item: Gene) => void;
declare const append: (parent: Gene, item: Gene) => void;
declare const appendAll: (parent: Gene, items: Gene[]) => void;
declare const afterAll: (anchor: Gene, items: Gene[]) => void;
declare const prepend: (parent: Gene, item: Gene) => void;
declare const wrap: (anchor: Gene, wrapper: Gene) => void;
export { before, after, afterAll, append, appendAll, prepend, wrap };
//# sourceMappingURL=Insertion.d.ts.map