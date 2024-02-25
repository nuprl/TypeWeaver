export default balanced;
/**
 * @param {string | RegExp} a
 * @param {string | RegExp} b
 * @param {string} str
 */
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
/**
 * @param {string} a
 * @param {string} b
 * @param {string} str
 */
declare function range(a: string, b: string, str: string): number[];
