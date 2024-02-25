export default ReadableAsyncKit;
/**
 * Base constructor for all streams
 * used to hold properties/methods
 */
declare function ReadableAsyncKit(...args: any[]): void;
declare class ReadableAsyncKit {
    /**
     * Base constructor for all streams
     * used to hold properties/methods
     */
    constructor(...args: any[]);
    jobs: {};
    destroy: typeof destroy;
    _start: typeof _start;
    _read: typeof _read;
}
/**
 * Destroys readable stream,
 * by aborting outstanding jobs
 *
 * @returns {void}
 */
declare function destroy(): void;
declare class destroy {
    destroyed: boolean;
}
/**
 * Starts provided jobs in async manner
 *
 * @private
 */
declare function _start(...args: any[]): void;
/**
 * Implement _read to comply with Readable streams
 * Doesn't really make sense for flowing object mode
 *
 * @private
 */
declare function _read(): void;
