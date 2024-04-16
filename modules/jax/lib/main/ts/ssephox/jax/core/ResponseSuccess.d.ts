import { FutureResult } from '@ssephox/katamari';
import { ResponseBodyDataTypes, ResponseTypeMap } from './HttpData';
import { HttpError } from './HttpError';
export declare const validate: <T extends keyof ResponseTypeMap>(responseType: ResponseBodyDataTypes, request: XMLHttpRequest) => FutureResult<ResponseTypeMap[T], HttpError<T>>;
//# sourceMappingURL=ResponseSuccess.d.ts.map