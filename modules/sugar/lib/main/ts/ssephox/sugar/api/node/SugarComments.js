import { Fun } from '@ssephox/katamari';
import { SugarElement } from './SugarElement';
const getNodes = (texas) => {
    const ret = [];
    while (texas.nextNode() !== null) {
        ret.push(SugarElement.fromDom(texas.currentNode));
    }
    return ret;
};
const find = (node, filterOpt) => {
    const predicate = filterOpt.getOr(Fun.always);
    const texas = document.createTreeWalker(node.dom, NodeFilter.SHOW_COMMENT, {
        acceptNode: (comment) => predicate(comment.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    return getNodes(texas);
};
export { find };
//# sourceMappingURL=SugarComments.js.map