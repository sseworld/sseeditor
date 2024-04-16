import { Result } from '@ssephox/katamari';
import { ResponseType, ResponseTypeMap } from './HttpData';
export declare const enum HttpErrorCode {
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    InternalServerError = 500
}
export interface HttpError<T extends ResponseType> {
    readonly message: string;
    readonly status: HttpErrorCode;
    readonly responseText: ResponseTypeMap[T];
}
export declare const httpError: <T extends keyof ResponseTypeMap>(status: number, message: string, responseText: ResponseTypeMap[T]) => Result<T, HttpError<T>>;
//# sourceMappingURL=HttpError.d.ts.map