import { SugarElement } from '../node/SugarElement';
declare const all: <T extends Element = Element>(selector: string) => SugarElement<T>[];
declare const ancestors: <T extends Element = Element>(scope: SugarElement<Node>, selector: string, isRoot?: (e: SugarElement<Node>) => boolean) => SugarElement<T>[];
declare const siblings: <T extends Element = Element>(scope: SugarElement<Node>, selector: string) => SugarElement<T>[];
declare const children: <T extends Element = Element>(scope: SugarElement<Node>, selector: string) => SugarElement<T>[];
declare const descendants: <T extends Element = Element>(scope: SugarElement<Node>, selector: string) => SugarElement<T>[];
export { all, ancestors, siblings, children, descendants };
//# sourceMappingURL=SelectorFilter.d.ts.map