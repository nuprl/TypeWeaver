declare const fs: any;
declare const MurmurHash3: any;
declare const onExit: any;
declare const path: any;
declare const promisify: any;
declare const activeFiles: {};
declare const threadId: any;
declare let invocations: number;
declare function getTmpname(filename: string): string;
declare function cleanupOnExit(tmpfile: string): void;
declare function serializeActiveFile(absoluteName: string): Promise<{}>;
declare function isChownErrOk(err: any): boolean;
declare function writeFileAsync(filename: any, data: any, options?: {}): Promise<void>;
declare function writeFile(filename: string, data: any, options: any, callback: any): Promise<void>;
declare function writeFileSync(filename: string, data: any, options: any): any;
