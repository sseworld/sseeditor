import { FutureResult } from '@ssephox/katamari';
import { DataType } from './DataType';
import { ResponseTypeMap } from './HttpData';
import { HttpError } from './HttpError';
import * as HttpTypes from './HttpTypes';
declare const send: <T extends keyof ResponseTypeMap>(init: HttpTypes.HttpRequest<T>) => FutureResult<ResponseTypeMap[T], HttpError<T>>;
declare const post: <T extends keyof ResponseTypeMap>(init: HttpTypes.PostPutInit<T>) => FutureResult<ResponseTypeMap[T], HttpError<T>>;
declare const put: <T extends keyof ResponseTypeMap>(init: HttpTypes.PostPutInit<T>) => FutureResult<ResponseTypeMap[T], HttpError<T>>;
declare const get: <T extends keyof ResponseTypeMap>(init: HttpTypes.GetDelInit<T>) => FutureResult<ResponseTypeMap[T], HttpError<T>>;
declare const del: <T extends keyof ResponseTypeMap>(init: HttpTypes.GetDelInit<T>) => FutureResult<ResponseTypeMap[T], HttpError<T>>;
declare const download: (init: HttpTypes.DownloadHttpRequest) => FutureResult<Blob, HttpError<DataType.Blob>>;
export { send, post, put, get, del, download };
//# sourceMappingURL=Http.d.ts.map