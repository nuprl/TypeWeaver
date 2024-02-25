export class RegExpTree {
    constructor(re: any, { flags, groups, source, }: {
        flags: any;
        groups: any;
        source: any;
    });
    _re: any;
    _groups: any;
    flags: any;
    source: any;
    dotAll: any;
    global: any;
    ignoreCase: any;
    multiline: any;
    sticky: any;
    unicode: any;
    test(string: any): any;
    compile(string: any): any;
    toString(): string;
    _toStringResult: string;
    exec(string: any): any;
}
