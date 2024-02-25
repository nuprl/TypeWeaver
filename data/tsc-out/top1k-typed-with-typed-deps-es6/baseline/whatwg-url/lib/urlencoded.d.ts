declare namespace _default {
    export { parseUrlencodedString };
    export { serializeUrlencoded };
}
export default _default;
declare function parseUrlencodedString(input: any): any[][];
declare function serializeUrlencoded(tuples: any, encodingOverride?: any): string;
