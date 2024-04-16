import { Fun, Optional } from '@ssephox/katamari';
import { PlatformDetection } from '@ssephox/sand';
import { fromRawEvent } from '../../impl/FilteredEvent';
import { SugarElement } from '../node/SugarElement';
import * as Scroll from './Scroll';
const get = (_win) => {
    const win = _win === undefined ? window : _win;
    if (PlatformDetection.detect().browser.isFirefox()) {
        // TINY-7984: Firefox 91 is returning incorrect values for visualViewport.pageTop, so disable it for now
        return Optional.none();
    }
    else {
        return Optional.from(win.visualViewport);
    }
};
const bounds = (x, y, width, height) => ({
    x,
    y,
    width,
    height,
    right: x + width,
    bottom: y + height
});
const getBounds = (_win) => {
    const win = _win === undefined ? window : _win;
    const doc = win.document;
    const scroll = Scroll.get(SugarElement.fromDom(doc));
    return get(win).fold(() => {
        const html = win.document.documentElement;
        // Don't use window.innerWidth/innerHeight here, as we don't want to include scrollbars
        // since the right/bottom position is based on the edge of the scrollbar not the window
        const width = html.clientWidth;
        const height = html.clientHeight;
        return bounds(scroll.left, scroll.top, width, height);
    }, (visualViewport) => 
    // iOS doesn't update the pageTop/pageLeft when element.scrollIntoView() is called, so we need to fallback to the
    // scroll position which will always be less than the page top/left values when page top/left are accurate/correct.
    bounds(Math.max(visualViewport.pageLeft, scroll.left), Math.max(visualViewport.pageTop, scroll.top), visualViewport.width, visualViewport.height));
};
const bind = (name, callback, _win) => get(_win).map((visualViewport) => {
    const handler = (e) => callback(fromRawEvent(e));
    visualViewport.addEventListener(name, handler);
    return {
        unbind: () => visualViewport.removeEventListener(name, handler)
    };
}).getOrThunk(() => ({
    unbind: Fun.noop
}));
export { bind, get, getBounds };
//# sourceMappingURL=WindowVisualViewport.js.map