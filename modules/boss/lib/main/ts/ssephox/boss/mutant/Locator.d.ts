import { Optional } from '@ssephox/katamari';
import { Gene } from '../api/Gene';
declare const byId: (item: Gene, id: string) => Optional<Gene>;
declare const byItem: (item: Gene, target: Gene) => Optional<Gene>;
declare const indexIn: (parent: Gene, item: Gene) => Optional<number>;
export { byId, byItem, indexIn };
//# sourceMappingURL=Locator.d.ts.map