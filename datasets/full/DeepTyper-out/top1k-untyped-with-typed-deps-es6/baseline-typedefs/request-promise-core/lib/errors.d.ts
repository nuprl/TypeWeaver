declare function RequestError(cause: any, options: any, response: any): void;
declare namespace RequestError {
    var prototype: any;
}
declare function StatusCodeError(statusCode: number, body: any, options: any, response: any): void;
declare namespace StatusCodeError {
    var prototype: any;
}
declare function TransformError(cause: any, options: any, response: any): void;
declare namespace TransformError {
    var prototype: any;
}
declare const _default: {
    RequestError: typeof RequestError;
    StatusCodeError: typeof StatusCodeError;
    TransformError: typeof TransformError;
};
export default _default;
