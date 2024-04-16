import { Optional } from '@ssephox/katamari';
import { Gene } from '../api/Gene';
export declare const enum GeneTypes {
    Text = "TEXT_GENE",
    Comment = "COMMENT_GENE",
    Special = "SPECIAL_GENE"
}
declare const children: (item: Gene) => Gene[];
declare const name: (item: Gene) => string;
declare const parent: (item: Gene) => Optional<Gene>;
declare const document: (_item: Gene) => undefined;
declare const isText: (item: Gene) => boolean;
declare const isComment: (item: Gene) => boolean;
declare const isElement: (item: Gene) => boolean;
declare const isSpecial: (item: Gene) => boolean;
declare const getLanguage: (item: Gene) => Optional<string>;
declare const getText: (item: Gene) => string;
declare const setText: (item: Gene, value: string | undefined) => void;
declare const isEmptyTag: (item: Gene) => boolean;
declare const isBoundary: (item: Gene) => boolean;
declare const isNonEditable: (item: Gene) => boolean;
export { children, name, parent, document, isText, isComment, isElement, isSpecial, getLanguage, getText, setText, isEmptyTag, isBoundary, isNonEditable };
//# sourceMappingURL=Properties.d.ts.map