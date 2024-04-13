import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
declare const is: <T extends Element = Element>(element: SugarElement<Node>, selector: string) => element is SugarElement<T>;
declare const all: <T extends Element = Element>(selector: string, scope?: SugarElement<Node>) => SugarElement<T>[];
declare const one: <T extends Element = Element>(selector: string, scope?: SugarElement<Node>) => Optional<SugarElement<T>>;
export { all, is, one };
//# sourceMappingURL=Selectors.d.ts.map