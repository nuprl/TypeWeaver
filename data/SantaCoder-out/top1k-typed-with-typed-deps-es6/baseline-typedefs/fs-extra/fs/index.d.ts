export declare const exists: (filename: string, callback: any) => void | Promise<unknown>;
export declare const read: (fd: number, buffer: Uint8Array, offset: number, length: number, position: number, callback: any) => void | Promise<unknown>;
export declare const write: (fd: number, buffer: Uint8Array, ...args: any[]) => void | Promise<unknown>;
