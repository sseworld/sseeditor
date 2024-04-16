import { SandHTMLElement } from '@ssephox/sand';
import * as NodeTypes from './NodeTypes';
const name = (element) => {
    const r = element.dom.nodeName;
    return r.toLowerCase();
};
const type = (element) => element.dom.nodeType;
const value = (element) => element.dom.nodeValue;
const isType = (t) => (element) => type(element) === t;
const isComment = (element) => type(element) === NodeTypes.COMMENT || name(element) === '#comment';
const isHTMLElement = (element) => isElement(element) && SandHTMLElement.isPrototypeOf(element.dom);
const isElement = isType(NodeTypes.ELEMENT);
const isText = isType(NodeTypes.TEXT);
const isDocument = isType(NodeTypes.DOCUMENT);
const isDocumentFragment = isType(NodeTypes.DOCUMENT_FRAGMENT);
const isTag = (tag) => (e) => isElement(e) && name(e) === tag;
export { name, type, value, isElement, isHTMLElement, isText, isDocument, isDocumentFragment, isComment, isTag };
//# sourceMappingURL=SugarNode.js.map