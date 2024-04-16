import { Optional } from '@ssephox/katamari';
import { Gene } from './Gene';
import { Universe } from './Universe';
export interface TestUniverseUp extends ReturnType<Universe<Gene, undefined>['up']> {
    top: (element: Gene) => Gene;
}
export interface TestUniverse extends Universe<Gene, undefined> {
    up: () => TestUniverseUp;
    find: (root: Gene, id: string) => Optional<Gene>;
    get: () => Gene;
    shortlog: (f?: (e: Gene) => string) => string;
}
export declare const TestUniverse: (raw: Gene) => TestUniverse;
//# sourceMappingURL=TestUniverse.d.ts.map