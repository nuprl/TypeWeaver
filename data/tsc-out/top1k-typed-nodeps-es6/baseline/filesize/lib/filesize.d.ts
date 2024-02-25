/**
 * filesize
 *
 * @method filesize
 * @param  {Mixed}   arg        String, Int or Float to transform
 * @param  {Object}  descriptor [Optional] Flags
 * @return {String}             Readable file size String
 */
declare function _exports(arg: Mixed, ...args: any[]): string;
declare namespace _exports {
    function partial(opt: any): (arg: any) => string;
}
export = _exports;
