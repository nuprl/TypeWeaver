export = ValueParser;
declare function ValueParser(value: any): ValueParser;
declare class ValueParser {
    constructor(value: any);
    nodes: any[];
    toString(): any;
    walk(cb: any, bubble: any): ValueParser;
}
declare namespace ValueParser {
    export const unit: (value: any) => false | {
        number: any;
        unit: any;
    };
    export { walk };
    export { stringify };
}
import walk = require("./walk");
import stringify = require("./stringify");
