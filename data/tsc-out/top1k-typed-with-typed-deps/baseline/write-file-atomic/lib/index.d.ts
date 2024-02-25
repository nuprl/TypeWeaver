export = writeFile;
declare function writeFile(filename: any, data: any, options: any, callback: any): Promise<any>;
declare namespace writeFile {
    export { writeFileSync as sync, getTmpname as _getTmpname, cleanupOnExit as _cleanupOnExit };
}
declare function writeFileSync(filename: any, data: any, options: any): void;
declare function getTmpname(filename: any): string;
declare function cleanupOnExit(tmpfile: any): () => void;
