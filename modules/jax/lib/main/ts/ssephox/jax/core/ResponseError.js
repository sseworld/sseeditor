import { Future, Optional } from '@ssephox/katamari';
import { readBlobAsText } from './BlobReader';
import { DataType } from './DataType';
import * as JsonResponse from './JsonResponse';
// can't get responseText of a blob, throws a DomException. Need to use FileReader.
// request.response can be null if the server provided no content in the error response.
const getBlobError = (request) => Optional.from(request.response).map(readBlobAsText).getOr(Future.pure('no response content'));
const fallback = (request) => Future.pure(request.response);
const getResponseText = (responseType, request) => {
    // for errors, the responseText is json if it can be, fallback if it can't
    switch (responseType) {
        case DataType.JSON: return JsonResponse.create(request.response).fold(() => fallback(request), Future.pure);
        case DataType.Blob: return getBlobError(request);
        case DataType.Text: return fallback(request);
        default: return fallback(request);
    }
};
const statusText = (request) => {
    if (request.statusText === '') {
        // Safari bug with HTTPS requests
        if (request.status === 404) {
            return 'Not Found';
        }
        else {
            return `Response code ${request.status}`;
        }
    }
    else {
        return request.statusText;
    }
};
const errorMessage = (url, request) => {
    if (request.status === 0) {
        return 'Unknown HTTP error (possible cross-domain request)';
    }
    else {
        return `Could not load url ${url}: ${statusText(request)}`;
    }
};
export const handle = (url, responseType, request) => getResponseText(responseType, request).map((responseText) => {
    return {
        message: errorMessage(url, request),
        status: request.status,
        responseText
    };
});
//# sourceMappingURL=ResponseError.js.map