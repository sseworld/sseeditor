import { Optional } from '@ssephox/katamari';
export interface Gene {
    id: string;
    name: string;
    children: Gene[];
    css: Record<string, string>;
    attrs: Record<string, string>;
    text?: string;
    parent: Optional<Gene>;
    random?: number;
}
export declare const Gene: (id: string, name: string, children?: Gene[], css?: Record<string, string>, attrs?: Record<string, string>, text?: string) => Gene;
//# sourceMappingURL=Gene.d.ts.map