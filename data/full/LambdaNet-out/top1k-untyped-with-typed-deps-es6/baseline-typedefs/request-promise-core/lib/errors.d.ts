declare function RequestError(cause: object, options: string, response: string): void;
declare namespace RequestError {
    var prototype: any;
}
declare function StatusCodeError(statusCode: number, body: string, options: string, response: string): void;
declare namespace StatusCodeError {
    var prototype: any;
}
declare function TransformError(cause: object, options: string, response: string): void;
declare namespace TransformError {
    var prototype: any;
}
declare const _default: {
    RequestError: typeof RequestError;
    StatusCodeError: typeof StatusCodeError;
    TransformError: typeof TransformError;
};
export default _default;
