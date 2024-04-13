import { SugarElement } from '../node/SugarElement';
declare const any: (selector: string) => boolean;
declare const ancestor: (scope: SugarElement<Node>, selector: string, isRoot?: (e: SugarElement<Node>) => boolean) => boolean;
declare const sibling: (scope: SugarElement<Node>, selector: string) => boolean;
declare const child: (scope: SugarElement<Node>, selector: string) => boolean;
declare const descendant: (scope: SugarElement<Node>, selector: string) => boolean;
declare const closest: (scope: SugarElement<Node>, selector: string, isRoot?: (e: SugarElement<Node>) => boolean) => boolean;
export { any, ancestor, sibling, child, descendant, closest };
//# sourceMappingURL=SelectorExists.d.ts.map