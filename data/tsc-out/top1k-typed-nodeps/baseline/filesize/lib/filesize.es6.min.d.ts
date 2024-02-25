declare function _exports(r: any, { bits: l, pad: s, base: a, round: f, locale: u, localeOptions: p, separator: c, spacer: d, symbols: g, standard: h, output: y, fullform: B, fullforms: m, exponent: M, roundingMethod: T, precision: w }?: {
    bits?: boolean;
    pad?: boolean;
    base?: number;
    round?: number;
    locale?: string;
    localeOptions?: {};
    separator?: string;
    spacer?: string;
    symbols?: {};
    standard?: string;
    output?: string;
    fullform?: boolean;
    fullforms?: any[];
    exponent?: number;
    roundingMethod?: string;
    precision?: number;
}): string | number | any[] | {
    value: any;
    symbol: any;
    exponent: number;
    unit: string;
};
declare namespace _exports {
    function partial(t: any): (i: any) => string | number | any[] | {
        value: any;
        symbol: any;
        exponent: number;
        unit: string;
    };
}
export = _exports;
