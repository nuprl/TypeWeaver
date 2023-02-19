declare function filesize(arg: any, { bits, pad, base, round, locale, localeOptions, separator, spacer, symbols, standard, output, fullform, fullforms, exponent, roundingMethod, precision }?: {
    bits?: boolean;
    pad?: boolean;
    base?: number;
    round?: number;
    locale?: string;
    localeOptions?: {};
    separator?: string;
    spacer?: any;
    symbols?: {};
    standard?: string;
    output?: string;
    fullform?: boolean;
    fullforms?: any[];
    exponent?: number;
    roundingMethod?: RegExp;
    precision?: number;
}): string | number | any[] | {
    value: any;
    symbol: any;
    exponent: number;
    unit: string;
};
declare namespace filesize {
    var partial: (opt: any) => (arg: any) => string | number | any[] | {
        value: any;
        symbol: any;
        exponent: number;
        unit: string;
    };
}
export { filesize as default };
