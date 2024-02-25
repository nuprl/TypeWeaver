export default ValueParser;
declare function ValueParser(value: any): ValueParser;
declare class ValueParser {
    constructor(value: any);
    nodes: any[];
    toString(): any;
    walk(cb: any, bubble: any): ValueParser;
}
declare namespace ValueParser {
    export const unit: typeof import("./unit");
    export { walk };
    export { stringify };
}
import walk from "./walk";
import stringify from "./stringify";
