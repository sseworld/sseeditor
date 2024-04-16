import { Arr, Obj, Optional } from '@ssephox/katamari';
import TagBoundaries from '../common/TagBoundaries';
const children = (item) => {
    return item.children;
};
const name = (item) => {
    return item.name;
};
const parent = (item) => {
    return item.parent;
};
const document = (_item) => {
    return undefined; // currently the test universe does not have documents
};
const isText = (item) => {
    return item.name === "TEXT_GENE" /* GeneTypes.Text */;
};
const isComment = (item) => {
    return item.name === "COMMENT_GENE" /* GeneTypes.Comment */;
};
const isElement = (item) => {
    return item.name !== undefined && item.name !== "TEXT_GENE" /* GeneTypes.Text */ && item.name !== "COMMENT_GENE" /* GeneTypes.Comment */;
};
const isSpecial = (item) => {
    return item.name === "SPECIAL_GENE" /* GeneTypes.Special */;
};
const getLanguage = (item) => Obj.get(item.attrs, 'lang');
const getText = (item) => {
    return Optional.from(item.text).getOrDie('Text not available on this node');
};
const setText = (item, value) => {
    item.text = value;
};
const isEmptyTag = (item) => {
    return Arr.contains(['br', 'img', 'hr'], item.name);
};
const isBoundary = (item) => {
    return Arr.contains(TagBoundaries, item.name);
};
const isNonEditable = (item) => {
    return isElement(item) && item.attrs.contenteditable === 'false';
};
export { children, name, parent, document, isText, isComment, isElement, isSpecial, getLanguage, getText, setText, isEmptyTag, isBoundary, isNonEditable };
//# sourceMappingURL=Properties.js.map