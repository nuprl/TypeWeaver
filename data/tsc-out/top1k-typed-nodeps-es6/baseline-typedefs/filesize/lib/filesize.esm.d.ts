export { filesize as default };
declare function filesize(arg: Mixed, { bits, pad, base, round, locale, localeOptions, separator, spacer, symbols, standard, output, fullform, fullforms, exponent, roundingMethod, precision }?: any): string;
declare namespace filesize {
    function partial(opt: any): (arg: any) => string;
}
