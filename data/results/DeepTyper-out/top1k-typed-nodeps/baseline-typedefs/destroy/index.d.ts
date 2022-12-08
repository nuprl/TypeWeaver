/*!
 * destroy
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var EventEmitter: any;
declare var ReadStream: any;
declare var Stream: any;
declare var Zlib: any;
declare function destroy(stream: any, suppress: any): void;
declare function destroyReadStream(stream: any): void;
declare function closeZlibStream(stream: any): void;
declare function destroyZlibStream(stream: any): void;
declare function hasDestroy(stream: any): any;
declare function isEventEmitter(val: any): any;
declare function isFsReadStream(stream: any): any;
declare function isZlibStream(stream: any): any;
declare function noop(): void;
declare function onDrainClearBinding(): void;
declare function onOpenClose(): void;
