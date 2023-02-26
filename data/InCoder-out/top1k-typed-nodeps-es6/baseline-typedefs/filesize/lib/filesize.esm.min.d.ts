declare function i(i: number, { bits: e, any, pad: o, any, base: b, any, round: n, any, locale: r, any, localeOptions: a, any, separator: l, any, spacer: s, any, symbols: c, any, standard: p, any, output: d, any, fullform: u, any, fullforms: g, any, exponent: B, any, roundingMethod: f, Math, round, precision: h }: {
    bits?: boolean;
    any: any;
    pad?: boolean;
    base?: number;
    round: any;
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
    Math: any;
    precision?: number;
}, $: any): string | number | any[] | {
    value: any;
    symbol: any;
    exponent: number;
    unit: string;
};
declare namespace i {
    var partial: (t: any) => (e: any) => string | number | any[] | {
        value: any;
        symbol: any;
        exponent: number;
        unit: string;
    };
}
export { i as default };
