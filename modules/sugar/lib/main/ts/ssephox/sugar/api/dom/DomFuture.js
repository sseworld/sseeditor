import { Future, LazyValue, Result } from '@ssephox/katamari';
import * as DomEvent from '../events/DomEvent';
const w = (fType, element, eventType, timeout) => fType((callback) => {
    const listener = DomEvent.bind(element, eventType, (event) => {
        clearTimeout(time);
        listener.unbind();
        callback(Result.value(event));
    });
    const time = setTimeout(() => {
        listener.unbind();
        callback(Result.error('Event ' + eventType + ' did not fire within ' + timeout + 'ms'));
    }, timeout);
});
const cWaitFor = (element, eventType, timeout) => w(LazyValue.nu, element, eventType, timeout);
const waitFor = (element, eventType, timeout) => w(Future.nu, element, eventType, timeout);
export { cWaitFor, waitFor };
//# sourceMappingURL=DomFuture.js.map