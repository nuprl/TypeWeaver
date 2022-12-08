declare function balanced(a: number, b: number, str: string): {
    start: any;
    end: any;
    pre: string;
    body: string;
    post: string;
};
declare namespace balanced {
    var range: (a: number, b: number, str: string) => any;
}
export default balanced;
