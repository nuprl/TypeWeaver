export = balanced;
declare function balanced(a: string | RegExp, b: string | RegExp, str: string): {
    start: number;
    end: number;
    pre: string;
    body: string;
    post: string;
};
declare namespace balanced {
    export { range };
}
declare function range(a: string, b: string, str: string): number[];
