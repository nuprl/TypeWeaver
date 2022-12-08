declare function ValueParser(value: any): any;
declare namespace ValueParser {
    var unit: any;
    var walk: typeof import("./walk").default;
    var stringify: typeof import("./stringify").default;
}
export default ValueParser;
