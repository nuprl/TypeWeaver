export = LinkResolver;
declare class LinkResolver {
    cache: Map<any, any>;
    /**
     * @param {string} file path to file or directory
     * @returns {string[]} array of file and all symlinks contributed in the resolving process (first item is the resolved file)
     */
    resolve(file: string): string[];
}
