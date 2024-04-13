import { Future, LazyValue, Result } from '@ssephox/katamari';
import { EventArgs } from '../events/Types';
import { SugarElement } from '../node/SugarElement';
declare const cWaitFor: (element: SugarElement<EventTarget>, eventType: string, timeout: number) => LazyValue<Result<EventArgs, string>>;
declare const waitFor: (element: SugarElement<EventTarget>, eventType: string, timeout: number) => Future<Result<EventArgs, string>>;
export { cWaitFor, waitFor };
//# sourceMappingURL=DomFuture.d.ts.map