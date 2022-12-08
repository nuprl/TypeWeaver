declare function balanced(a: number, b: number, str: string): {
    start: any;
    end: any;
    pre: string;
    body: string;
    post: string;
};
declare namespace balanced {
    var range: typeof globalThis.range;
}
declare function maybeMatch(reg: RegExp, str: string | RegExp): any;
declare function range(a: number, b: number, str: string): any;
