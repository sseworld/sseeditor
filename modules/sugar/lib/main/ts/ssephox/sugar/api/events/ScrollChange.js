import * as Scroll from '../view/Scroll';
import * as DomEvent from './DomEvent';
/* Some browsers (Firefox) fire a scroll event even if the values for scroll don't
 * change. This acts as an intermediary between the scroll event, and the value for scroll
 * changing
 */
const bind = (doc, handler) => {
    let lastScroll = Scroll.get(doc);
    const scrollBinder = DomEvent.bind(doc, 'scroll', (_event) => {
        const scroll = Scroll.get(doc);
        if ((scroll.top !== lastScroll.top) || (scroll.left !== lastScroll.left)) {
            handler(scroll);
        }
        lastScroll = scroll;
    });
    return {
        unbind: scrollBinder.unbind
    };
};
export { bind };
//# sourceMappingURL=ScrollChange.js.map