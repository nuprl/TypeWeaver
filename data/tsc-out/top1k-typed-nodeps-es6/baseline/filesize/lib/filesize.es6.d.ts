/**
 * filesize
 *
 * @method filesize
 * @param  {Mixed}   arg        String, Int or Float to transform
 * @param  {Object}  descriptor [Optional] Flags
 * @return {String}             Readable file size String
 */
declare function _exports(arg: Mixed, { bits, pad, base, round, locale, localeOptions, separator, spacer, symbols, standard, output, fullform, fullforms, exponent, roundingMethod, precision }?: any): string;
declare namespace _exports {
    function partial(opt: any): (arg: any) => string;
}
export = _exports;
