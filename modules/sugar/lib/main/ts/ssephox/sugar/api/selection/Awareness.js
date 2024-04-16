import { Arr, Unicode } from '@ssephox/katamari';
import * as SugarNode from '../node/SugarNode';
import * as SugarText from '../node/SugarText';
import * as Attribute from '../properties/Attribute';
import * as Traverse from '../search/Traverse';
const getEnd = (element) => SugarNode.name(element) === 'img' ? 1 : SugarText.getOption(element).fold(() => Traverse.children(element).length, (v) => v.length);
const isEnd = (element, offset) => getEnd(element) === offset;
const isStart = (element, offset) => offset === 0;
const isTextNodeWithCursorPosition = (el) => SugarText.getOption(el).filter((text) => 
// For the purposes of finding cursor positions only allow text nodes with content,
// but trim removes &nbsp; and that's allowed
text.trim().length !== 0 || text.indexOf(Unicode.nbsp) > -1).isSome();
const isContentEditableFalse = (elem) => SugarNode.isHTMLElement(elem) && (Attribute.get(elem, 'contenteditable') === 'false');
const elementsWithCursorPosition = ['img', 'br'];
const isCursorPosition = (elem) => {
    const hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || Arr.contains(elementsWithCursorPosition, SugarNode.name(elem)) || isContentEditableFalse(elem);
};
export { getEnd, isEnd, isStart, isCursorPosition };
//# sourceMappingURL=Awareness.js.map