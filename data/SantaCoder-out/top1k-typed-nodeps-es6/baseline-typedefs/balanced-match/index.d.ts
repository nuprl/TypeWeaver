declare function balanced(a: string, b: string, str: string): {
    start: any;
    end: any;
    pre: string;
    body: string;
    post: string;
};
declare namespace balanced {
    var range: (a: string, b: string, str: string) => any;
}
export default balanced;
