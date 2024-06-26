import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
import { RawRect } from './Rect';
import { SimRange } from './SimRange';
import { SimSelection } from './SimSelection';
import { Situ } from './Situ';
declare const findWithin: <T extends Element>(win: Window, selection: SimSelection, selector: string) => SugarElement<T>[];
declare const setExact: (win: Window, start: SugarElement<Node>, soffset: number, finish: SugarElement<Node>, foffset: number) => void;
declare const setRelative: (win: Window, startSitu: Situ, finishSitu: Situ) => void;
declare const toNative: (selection: SimSelection) => Range;
declare const setToElement: (win: Window, element: SugarElement<Node>, selectNodeContents?: boolean) => void;
declare const forElement: (win: Window, element: SugarElement<Node>) => SimRange;
declare const getExact: (win: Window) => Optional<SimRange>;
declare const get: (win: Window) => Optional<SimSelection>;
declare const getFirstRect: (win: Window, selection: SimSelection) => Optional<RawRect>;
declare const getBounds: (win: Window, selection: SimSelection) => Optional<RawRect>;
declare const getAtPoint: (win: Window, x: number, y: number) => Optional<SimRange>;
declare const getAsString: (win: Window, selection: SimSelection) => string;
declare const clear: (win: Window) => void;
declare const clone: (win: Window, selection: SimSelection) => SugarElement<DocumentFragment>;
declare const replace: (win: Window, selection: SimSelection, elements: SugarElement<Node>[]) => void;
declare const deleteAt: (win: Window, selection: SimSelection) => void;
declare const isCollapsed: (start: SugarElement<Node>, soffset: number, finish: SugarElement<Node>, foffset: number) => boolean;
export { setExact, getExact, get, setRelative, toNative, setToElement, clear, clone, replace, deleteAt, forElement, getFirstRect, getBounds, getAtPoint, findWithin, getAsString, isCollapsed };
//# sourceMappingURL=WindowSelection.d.ts.map