import { Fun } from '@ssephox/katamari';
import * as Compare from '../dom/Compare';
import * as Awareness from './Awareness';
import * as CursorPosition from './CursorPosition';
const isAtEdge = (parent, current, currentOffset, descent, awareness) => descent(parent).fold(Fun.always, (element) => Compare.eq(current, element) && awareness(current, currentOffset));
const isLeft = (parent, selection) => isAtEdge(parent, selection.startContainer(), selection.startOffset(), CursorPosition.first, Awareness.isStart);
// This is doing exactly the same thing as the above isLeft method, checking to see if an element/offset selection endpoint is at the left edge of its parent
// after ascending up to that parent except we explicitly provide the element and its offset instead of just using the selection object.
const isAtLeftEdge = (parent, element, offset) => isAtEdge(parent, element, offset, CursorPosition.first, Awareness.isStart);
const isRight = (parent, selection) => isAtEdge(parent, selection.startContainer(), selection.startOffset(), CursorPosition.last, Awareness.isEnd);
// This is doing exactly the same thing as the above isRight method, checking to see if an element/offset selection endpoint is at the right edge of its parent
// after ascending up to that parent except we explicitly provide the element and its offset instead of just using the selection object.
const isAtRightEdge = (parent, element, offset) => isAtEdge(parent, element, offset, CursorPosition.last, Awareness.isEnd);
export { isLeft, isAtLeftEdge, isRight, isAtRightEdge };
//# sourceMappingURL=Edge.js.map