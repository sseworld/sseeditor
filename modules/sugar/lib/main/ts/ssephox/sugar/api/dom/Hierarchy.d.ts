import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
declare const path: (ancestor: SugarElement<Node>, descendant: SugarElement<Node>) => Optional<number[]>;
declare const follow: (ancestor: SugarElement<Node>, descendantPath: number[]) => Optional<SugarElement<Node>>;
export { path, follow };
//# sourceMappingURL=Hierarchy.d.ts.map