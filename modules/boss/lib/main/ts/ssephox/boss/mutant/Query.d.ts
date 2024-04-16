import { Optional } from '@ssephox/katamari';
import { Gene } from '../api/Gene';
declare const comparePosition: (item: Gene, other: Gene) => number;
declare const prevSibling: (item: Gene) => Optional<Gene>;
declare const nextSibling: (item: Gene) => Optional<Gene>;
export { comparePosition, prevSibling, nextSibling };
//# sourceMappingURL=Query.d.ts.map