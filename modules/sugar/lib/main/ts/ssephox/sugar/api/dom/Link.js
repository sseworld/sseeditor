import { SugarElement } from '../node/SugarElement';
import * as SugarHead from '../node/SugarHead';
import * as Attribute from '../properties/Attribute';
import * as Insert from './Insert';
const addToHead = (doc, tag) => {
    const head = SugarHead.getHead(doc);
    Insert.append(head, tag);
};
const addStylesheet = (url, scope) => {
    const doc = scope || SugarElement.fromDom(document);
    const link = SugarElement.fromTag('link', doc.dom); // We really need to fix that SugarElement API
    Attribute.setAll(link, {
        rel: 'stylesheet',
        type: 'text/css',
        href: url
    });
    addToHead(doc, link);
    return link;
};
export { addStylesheet };
//# sourceMappingURL=Link.js.map