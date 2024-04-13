import { Optional } from '@ssephox/katamari';
import { HTMLElementFullTagNameMap } from '../../alien/DomTypes';
interface SugarElement<T = any> {
    readonly dom: T;
}
declare const SugarElement: {
    fromHtml: <E extends Node = Node & ChildNode>(html: string, scope?: Document | null) => SugarElement<E>;
    fromTag: {
        <K extends keyof HTMLElementTagNameMap | keyof HTMLElementDeprecatedTagNameMap>(tag: K, scope?: Document | null): SugarElement<HTMLElementFullTagNameMap[K]>;
        (tag: string, scope?: Document | null): SugarElement<HTMLElement>;
    };
    fromText: (text: string, scope?: Document | null) => SugarElement<Text>;
    fromDom: <T extends Node | Window>(node: T) => SugarElement<T>;
    fromPoint: (docElm: SugarElement<Document>, x: number, y: number) => Optional<SugarElement<Element>>;
};
export { SugarElement };
//# sourceMappingURL=SugarElement.d.ts.map