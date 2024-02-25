export = moveFile;
declare function moveFile(source: any, destination: any, options?: {}, root?: boolean, symlinks?: any[]): Promise<void>;
declare namespace moveFile {
    export { moveFileSync as sync };
}
declare function moveFileSync(source: any, destination: any, options?: {}, root?: boolean, symlinks?: any[]): void;
