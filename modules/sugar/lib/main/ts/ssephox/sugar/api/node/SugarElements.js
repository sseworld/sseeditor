import { Arr } from '@ssephox/katamari';
import * as Traverse from '../search/Traverse';
import { SugarElement } from './SugarElement';
const fromHtml = (html, scope) => {
    const doc = scope || document;
    const div = doc.createElement('div');
    div.innerHTML = html;
    return Traverse.children(SugarElement.fromDom(div));
};
const fromTags = (tags, scope) => Arr.map(tags, (x) => SugarElement.fromTag(x, scope));
const fromText = (texts, scope) => Arr.map(texts, (x) => SugarElement.fromText(x, scope));
const fromDom = (nodes) => Arr.map(nodes, SugarElement.fromDom);
export { fromHtml, fromTags, fromText, fromDom };
//# sourceMappingURL=SugarElements.js.map