import { Optional } from '@ssephox/katamari';
import { Gene } from '../api/Gene';
declare const selector: (item: Gene, query: string) => Optional<Gene>;
declare const closest: (scope: Gene, query: string) => Optional<Gene>;
declare const top: (item: Gene) => Gene;
declare const predicate: (item: Gene, f: (e: Gene) => boolean) => Optional<Gene>;
declare const all: (item: Gene) => Gene[];
export { selector, closest, predicate, all, top };
//# sourceMappingURL=Up.d.ts.map