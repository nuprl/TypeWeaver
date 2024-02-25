export default writeFile;
export function sync(filename: any, data: any, options: any): void;
export function _getTmpname(filename: any): string;
export function _cleanupOnExit(tmpfile: any): () => void;
declare function writeFile(filename: any, data: any, options: any, callback: any): Promise<any>;
