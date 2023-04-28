declare function i(i: number, { bits: e, e, pad: o, o, base: b, b, round: n, n, locale: r, r, localeOptions: a, a, separator: l, l, spacer: s, s, symbols: c, c, standard: p, p, output: d, d, fullform: u, u, fullforms: g, g, exponent: B, B, roundingMethod: f, f, precision: h }: {
    bits?: boolean;
    e: any;
    pad?: boolean;
    o: any;
    base?: number;
    b: any;
    round?: number;
    n: any;
    locale?: string;
    r: any;
    localeOptions?: {};
    a: any;
    separator?: string;
    l: any;
    spacer?: string;
    s: any;
    symbols?: {};
    c: any;
    standard?: string;
    p: any;
    output?: string;
    d: any;
    fullform?: boolean;
    u: any;
    fullforms?: any[];
    g: any;
    exponent?: number;
    B: any;
    roundingMethod?: string;
    f: any;
    precision?: number;
}, i: any): string | number | any[] | {
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
