import { FutureResult } from '@ssephox/katamari';
import { ResponseTypeMap } from './HttpData';
import { HttpError } from './HttpError';
import { GetDelInit, JwtTokenFactory, PostPutInit } from './HttpTypes';
export declare const post: <T extends keyof ResponseTypeMap>(init: PostPutInit<T>, tokenFactory: JwtTokenFactory<T>) => FutureResult<T, HttpError<T>>;
export declare const put: <T extends keyof ResponseTypeMap>(init: PostPutInit<T>, tokenFactory: JwtTokenFactory<T>) => FutureResult<T, HttpError<T>>;
export declare const get: <T extends keyof ResponseTypeMap>(init: GetDelInit<T>, tokenFactory: JwtTokenFactory<T>) => FutureResult<T, HttpError<T>>;
export declare const del: <T extends keyof ResponseTypeMap>(init: GetDelInit<T>, tokenFactory: JwtTokenFactory<T>) => FutureResult<T, HttpError<T>>;
//# sourceMappingURL=HttpJwt.d.ts.map