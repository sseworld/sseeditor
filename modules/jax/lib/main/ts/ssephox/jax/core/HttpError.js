import { Result } from '@ssephox/katamari';
export const httpError = (status, message, responseText) => Result.error({ message, status, responseText });
//# sourceMappingURL=HttpError.js.map