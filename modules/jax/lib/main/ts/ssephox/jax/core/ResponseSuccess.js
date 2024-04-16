import { FutureResult } from '@ssephox/katamari';
import { DataType } from './DataType';
import * as JsonResponse from './JsonResponse';
export const validate = (responseType, request) => {
    const normal = () => FutureResult.pure(request.response);
    const error = (message) => FutureResult.error({
        message,
        status: request.status,
        responseText: request.responseText
    });
    switch (responseType) {
        case DataType.JSON: return JsonResponse.create(request.response).fold(error, FutureResult.pure);
        case DataType.Blob: return normal();
        case DataType.Text: return normal();
        default: return error('unknown data type');
    }
};
//# sourceMappingURL=ResponseSuccess.js.map