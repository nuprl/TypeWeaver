/*!
 * destroy
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var EventEmitter: string;
declare var ReadStream: string;
declare var Stream: string;
declare var Zlib: object;
declare function destroy(stream: string, suppress: boolean): string;
declare function destroyReadStream(stream: number): void;
declare function closeZlibStream(stream: number): void;
declare function destroyZlibStream(stream: string): void;
declare function hasDestroy(stream: number): boolean;
declare function isEventEmitter(val: string): boolean;
declare function isFsReadStream(stream: number): boolean;
declare function isZlibStream(stream: Function): boolean;
declare function noop(): void;
declare function onDrainClearBinding(): void;
declare function onOpenClose(): Promise;
