export default Mime;
/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
declare function Mime(...args: any[]): void;
declare class Mime {
    /**
     * @param typeMap [Object] Map of MIME type -> Array[extensions]
     * @param ...
     */
    constructor(...args: any[]);
    _types: any;
    _extensions: any;
    define: any;
    getType: any;
    getExtension: any;
}
