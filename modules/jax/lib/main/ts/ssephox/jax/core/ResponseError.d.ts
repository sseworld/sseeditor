import { Future } from '@ssephox/katamari';
import { ResponseBodyDataTypes } from './HttpData';
import { HttpError } from './HttpError';
export declare const handle: <T extends keyof import("./HttpData").ResponseTypeMap>(url: string, responseType: ResponseBodyDataTypes, request: XMLHttpRequest) => Future<HttpError<T>>;
//# sourceMappingURL=ResponseError.d.ts.map