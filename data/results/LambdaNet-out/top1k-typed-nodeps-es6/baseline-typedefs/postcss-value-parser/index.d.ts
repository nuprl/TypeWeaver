declare function ValueParser(value: string): HTMLElement;
declare namespace ValueParser {
    var unit: any;
    var walk: typeof import("./walk").default;
    var stringify: typeof import("./stringify").default;
}
export default ValueParser;
