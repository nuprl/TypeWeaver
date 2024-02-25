export default isDirectory;
/**
 * async
 */
declare function isDirectory(filepath: any, cb: any): void;
declare namespace isDirectory {
    /**
     * sync
     */
    function sync(filepath: any): boolean;
}
