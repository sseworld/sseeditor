import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
declare const ancestor: <A>(scope: SugarElement<Node>, transform: (e: SugarElement<Node>) => Optional<A>, isRoot?: (e: SugarElement<Node>) => boolean) => Optional<A>;
declare const closest: <A>(scope: SugarElement<Node>, transform: (e: SugarElement<Node>) => Optional<A>, isRoot?: (e: SugarElement<Node>) => boolean) => Optional<A>;
export { ancestor, closest };
//# sourceMappingURL=TransformFind.d.ts.map