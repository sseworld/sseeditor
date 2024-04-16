import { Fun } from '@ssephox/katamari';
import * as FilteredEvent from '../../impl/FilteredEvent';
const filter = Fun.always; // no filter on plain DomEvents
const bind = (element, event, handler) => FilteredEvent.bind(element, event, filter, handler);
const capture = (element, event, handler) => FilteredEvent.capture(element, event, filter, handler);
const fromRawEvent = FilteredEvent.fromRawEvent;
export { bind, capture, fromRawEvent };
//# sourceMappingURL=DomEvent.js.map