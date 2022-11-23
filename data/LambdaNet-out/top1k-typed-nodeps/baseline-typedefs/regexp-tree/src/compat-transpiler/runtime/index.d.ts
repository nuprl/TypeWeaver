declare class RegExpTree {
    constructor(re: any, { flags, groups, source, }: {
        flags: any;
        groups: any;
        source: any;
    });
    test(string: any): any;
    compile(string: any): any;
    toString(): any;
    exec(string: any): object;
}
