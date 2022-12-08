/// <reference types="node" />
export declare const exists: (filename: string | Buffer, callback: Function) => void | Promise<unknown>;
export declare const read: (fd: number, buffer: ArrayBuffer, offset: number, length: number, position: number, callback: Function) => void | Promise<unknown>;
export declare const write: (fd: umber, buffer: uffer, ...args: ny[]) => void | Promise<unknown>;
