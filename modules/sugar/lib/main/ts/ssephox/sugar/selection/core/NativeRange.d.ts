import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../../api/node/SugarElement';
import { RawRect } from '../../api/selection/Rect';
import { Situ } from '../../api/selection/Situ';
declare const selectNode: (win: Window, element: SugarElement<Node>) => Range;
declare const selectNodeContents: (win: Window, element: SugarElement<Node>) => Range;
declare const selectNodeContentsUsing: (rng: Range, element: SugarElement<Node>) => void;
declare const isWithin: (outerRange: Range, innerRange: Range) => boolean;
declare const create: (win: Window) => Range;
declare const replaceWith: (rng: Range, fragment: SugarElement<Node>) => void;
declare const relativeToNative: (win: Window, startSitu: Situ, finishSitu: Situ) => Range;
declare const exactToNative: (win: Window, start: SugarElement<Node>, soffset: number, finish: SugarElement<Node>, foffset: number) => Range;
declare const deleteContents: (rng: Range) => void;
declare const cloneFragment: (rng: Range) => SugarElement<DocumentFragment>;
declare const getFirstRect: (rng: Range) => Optional<RawRect>;
declare const getBounds: (rng: Range) => Optional<RawRect>;
declare const toString: (rng: Range) => string;
export { create, replaceWith, selectNode, selectNodeContents, selectNodeContentsUsing, relativeToNative, exactToNative, deleteContents, cloneFragment, getFirstRect, getBounds, isWithin, toString };
//# sourceMappingURL=NativeRange.d.ts.map