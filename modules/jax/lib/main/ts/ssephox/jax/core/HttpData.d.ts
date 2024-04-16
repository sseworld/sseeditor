import { DataType } from './DataType';
export interface ResponseTypeMap {
    [DataType.JSON]: any;
    [DataType.Blob]: Blob;
    [DataType.Text]: string;
}
export type ResponseType = keyof ResponseTypeMap;
export type RequestBody = JsonData | BlobData | TextData | FormData | MultipartFormData;
export type ResponseBody = Exclude<RequestBody, FormData>;
export type ResponseBodyDataTypes = Exclude<DataType, DataType.FormData>;
export interface JsonData {
    type: DataType.JSON;
    data: unknown;
}
export interface BlobData {
    type: DataType.Blob;
    data: Blob;
}
export interface TextData {
    type: DataType.Text;
    data: string;
}
export interface FormData {
    type: DataType.FormData;
    data: Record<string, string>;
}
export interface MultipartFormData {
    type: DataType.MultipartFormData;
    data: Record<string, string | Blob | File>;
}
export declare const jsonData: (data: any) => JsonData;
export declare const blobData: (data: Blob) => BlobData;
export declare const textData: (data: string) => TextData;
export declare const formData: (data: Record<string, string>) => FormData;
export declare const multipartFormData: (data: Record<string, string | Blob | File>) => MultipartFormData;
//# sourceMappingURL=HttpData.d.ts.map