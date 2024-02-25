export default ReadableAsyncKit;
declare function ReadableAsyncKit(...args: any[]): void;
declare class ReadableAsyncKit {
    constructor(...args: any[]);
    jobs: {};
    destroy: typeof destroy;
    _start: typeof _start;
    _read: typeof _read;
}
declare function destroy(): void;
declare class destroy {
    destroyed: boolean;
}
declare function _start(...args: any[]): void;
declare function _read(): void;
