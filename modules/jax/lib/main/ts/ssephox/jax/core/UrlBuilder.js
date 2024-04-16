import { Obj, Strings } from '@ssephox/katamari';
export const buildUrl = (url, queryParams) => queryParams.map((query) => {
    const parts = Obj.mapToArray(query, (v, k) => encodeURIComponent(k) + '=' + encodeURIComponent(v));
    const prefix = Strings.contains(url, '?') ? '&' : '?';
    return parts.length > 0 ? url + prefix + parts.join('&') : url;
}).getOr(url);
//# sourceMappingURL=UrlBuilder.js.map