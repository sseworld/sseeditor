import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
declare const first: <T extends Element = Element>(selector: string) => Optional<SugarElement<T>>;
declare const ancestor: <T extends Element = Element>(scope: SugarElement<Node>, selector: string, isRoot?: (e: SugarElement<Node>) => boolean) => Optional<SugarElement<T>>;
declare const sibling: <T extends Element = Element>(scope: SugarElement<Node>, selector: string) => Optional<SugarElement<T>>;
declare const child: <T extends Element = Element>(scope: SugarElement<Node>, selector: string) => Optional<SugarElement<T>>;
declare const descendant: <T extends Element = Element>(scope: SugarElement<Node>, selector: string) => Optional<SugarElement<T>>;
declare const closest: <T extends Element = Element>(scope: SugarElement<Node>, selector: string, isRoot?: (e: SugarElement<Node>) => boolean) => Optional<SugarElement<T>>;
export { first, ancestor, sibling, child, descendant, closest };
//# sourceMappingURL=SelectorFind.d.ts.map