import { FutureResult } from '@ssephox/katamari';
import * as Http from './Http';
const headers = (headersInput, token) => {
    const authHeader = { Authorization: 'Bearer ' + token };
    return headersInput ? { ...headersInput, ...authHeader } : authHeader;
};
const requestFreshToken = (tokenFactory) => tokenFactory(true);
const requestCachedToken = (tokenFactory) => tokenFactory(false);
const tryAgain = (tokenFactory, runMethod) => (error) => error.status === 401 /* HttpErrorCode.Unauthorized */ ? requestFreshToken(tokenFactory).bindFuture(runMethod) : FutureResult.error(error);
const runWithToken = (runMethod, tokenFactory) => requestCachedToken(tokenFactory).bindFuture((token) => runMethod(token).bind((result) => result.fold(tryAgain(tokenFactory, runMethod), FutureResult.pure)));
export const post = (init, tokenFactory) => runWithToken((token) => Http.post({ ...init, headers: headers(init.headers, token) }), tokenFactory);
export const put = (init, tokenFactory) => runWithToken((token) => Http.put({ ...init, headers: headers(init.headers, token) }), tokenFactory);
export const get = (init, tokenFactory) => runWithToken((token) => Http.get({ ...init, headers: headers(init.headers, token) }), tokenFactory);
export const del = (init, tokenFactory) => runWithToken((token) => Http.del({ ...init, headers: headers(init.headers, token) }), tokenFactory);
//# sourceMappingURL=HttpJwt.js.map