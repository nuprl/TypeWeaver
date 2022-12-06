/// <reference types="node" />
export default writeFile;
export declare const sync: typeof writeFileSync;
export declare const _getTmpname: typeof getTmpname;
export declare const _cleanupOnExit: typeof cleanupOnExit;
declare function getTmpname(filename: any): string;
declare function cleanupOnExit(tmpfile: File): () => void;
declare function writeFile(filename: string, data: Buffer, options: any, callback: Function): Promise<any>;
declare function writeFileSync(filename: string | Buffer, data: any, options: any): void;
