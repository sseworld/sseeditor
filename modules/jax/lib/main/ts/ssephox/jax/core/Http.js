import { FutureResult, Global, Obj, Optional, Result, Strings, Type } from '@ssephox/katamari';
import { DataType } from './DataType';
import { textData } from './HttpData';
import * as ResponseError from './ResponseError';
import * as ResponseSuccess from './ResponseSuccess';
import { buildUrl } from './UrlBuilder';
const getContentType = (requestBody) => Optional.from(requestBody).bind((b) => {
    switch (b.type) {
        case DataType.JSON: return Optional.some('application/json');
        case DataType.FormData: return Optional.some('application/x-www-form-urlencoded; charset=UTF-8');
        case DataType.MultipartFormData: return Optional.none();
        case DataType.Text: return Optional.some('text/plain');
        default: return Optional.some('text/plain');
    }
});
const getAccept = (responseType) => {
    switch (responseType) {
        case DataType.Blob: return 'application/octet-stream';
        case DataType.JSON: return 'application/json, text/javascript';
        case DataType.Text: return 'text/plain';
        default: return '';
    }
};
const getResponseType = (responseType) => {
    switch (responseType) {
        case DataType.JSON: return Optional.none();
        case DataType.Blob: return Optional.some('blob');
        case DataType.Text: return Optional.some('text');
        default: return Optional.none();
    }
};
const createOptions = (init) => {
    const contentType = getContentType(init.body);
    const credentials = init.credentials === true ? Optional.some(true) : Optional.none();
    const accept = getAccept(init.responseType) + ', */*; q=0.01';
    const headers = init.headers !== undefined ? init.headers : {};
    const responseType = getResponseType(init.responseType);
    const progress = Type.isFunction(init.progress) ? Optional.some(init.progress) : Optional.none();
    return {
        contentType,
        responseType,
        credentials,
        accept,
        headers,
        progress
    };
};
const applyOptions = (request, options) => {
    options.contentType.each((contentType) => request.setRequestHeader('Content-Type', contentType));
    request.setRequestHeader('Accept', options.accept);
    options.credentials.each((creds) => request.withCredentials = creds);
    options.responseType.each((responseType) => request.responseType = responseType);
    options.progress.each((progressFunction) => request.upload.addEventListener('progress', (event) => progressFunction(event.loaded, event.total)));
    Obj.each(options.headers, (v, k) => request.setRequestHeader(k, v));
};
const toNativeFormData = (formDataInput) => {
    const nativeFormData = new FormData();
    Obj.each(formDataInput, (value, key) => {
        nativeFormData.append(key, value);
    });
    return nativeFormData;
};
const getData = (body) => Optional.from(body).map((b) => {
    if (b.type === DataType.JSON) {
        return JSON.stringify(b.data);
    }
    else if (b.type === DataType.FormData) {
        return toNativeFormData(b.data);
    }
    else if (b.type === DataType.MultipartFormData) {
        return toNativeFormData(b.data);
    }
    else {
        return b.data;
    }
});
const send = (init) => FutureResult.nu((callback) => {
    const request = new XMLHttpRequest();
    request.open(init.method, buildUrl(init.url, Optional.from(init.query)), true); // enforced async! enforced type as String!
    const options = createOptions(init);
    applyOptions(request, options);
    const onError = () => {
        ResponseError.handle(init.url, init.responseType, request).get((err) => callback(Result.error(err)));
    };
    const onLoad = () => {
        // Local files and Cors errors return status 0.
        // The only way we can decifer a local request is request url starts with 'file:' and allow local files to succeed.
        if (request.status === 0 && !Strings.startsWith(init.url, 'file:')) {
            onError();
        }
        else if (request.status < 100 || request.status >= 400) {
            onError();
        }
        else {
            ResponseSuccess.validate(init.responseType, request).get(callback);
        }
    };
    request.onerror = onError;
    request.onload = onLoad;
    getData(init.body).fold(() => request.send(), (data) => {
        request.send(data);
    });
});
const empty = () => textData('');
const post = (init) => send({ ...init, method: "post" /* HttpTypes.HttpMethod.Post */ });
const put = (init) => send({ ...init, method: "put" /* HttpTypes.HttpMethod.Put */ });
const get = (init) => send({ ...init, method: "get" /* HttpTypes.HttpMethod.Get */, body: empty() });
const del = (init) => send({ ...init, method: "delete" /* HttpTypes.HttpMethod.Delete */, body: empty() });
const sendProgress = (init, loaded) => {
    if (Type.isFunction(init.progress)) {
        init.progress(loaded);
    }
};
const getMimeType = (headers) => Optional.from(headers.get('content-type')).map((value) => value.split(';')[0]);
const fetchDownload = (init) => FutureResult.nu((resolve) => {
    const fail = (message, status) => {
        resolve(Result.error({
            message,
            status,
            responseText: new Blob()
        }));
    };
    const failOnError = (_e) => {
        fail(`Could not load url ${init.url}`, 500 /* HttpErrorCode.InternalServerError */);
    };
    const downloadStream = (response) => {
        const body = response.body;
        const chunks = [];
        let loaded = 0;
        const mime = getMimeType(response.headers);
        sendProgress(init, 0);
        if (body) {
            const reader = body.getReader();
            const process = (result) => {
                if (result.done) {
                    resolve(Result.value(new Blob(chunks, { type: mime.getOr('') })));
                }
                else {
                    chunks.push(result.value);
                    loaded += result.value.length;
                    sendProgress(init, loaded);
                    reader.read().then(process).catch(failOnError);
                }
            };
            reader.read().then(process).catch(failOnError);
        }
        else {
            fail('Failed to get response body', 500 /* HttpErrorCode.InternalServerError */);
        }
    };
    window.fetch(init.url, {
        method: 'get',
        headers: init.headers,
        credentials: init.credentials ? 'include' : 'omit'
    }).then((response) => {
        if (response.status < 100 || response.status >= 400) {
            fail(`Could not load url ${init.url}`, response.status);
        }
        else {
            downloadStream(response);
        }
    }).catch(failOnError);
});
const fallbackDownload = (init) => {
    sendProgress(init, 0);
    return get({
        url: init.url,
        responseType: DataType.Blob,
        headers: init.headers
    }).mapResult((blob) => {
        sendProgress(init, blob.size);
        return blob;
    });
};
const download = (init) => Obj.get(Global, 'fetch').exists(Type.isFunction) ?
    fetchDownload(init) :
    fallbackDownload(init);
export { send, post, put, get, del, download };
//# sourceMappingURL=Http.js.map