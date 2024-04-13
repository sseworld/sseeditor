import { Optional } from '@ssephox/katamari';
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
declare const checkOpt: <T extends Node>(expected: Optional<SugarElement<T>>, actual: Optional<SugarElement<T>>) => void;
declare const checkList: <T extends Node>(expected: ArrayLike<SugarElement<T>>, actual: ArrayLike<SugarElement<T>>) => void;
declare const isName: <K extends keyof HTMLElementTagNameMap>(name: K) => (x: SugarElement<Node>) => x is SugarElement<HTMLElementTagNameMap[K]>;
export { checkOpt, checkList, isName };
//# sourceMappingURL=Checkers.d.ts.map