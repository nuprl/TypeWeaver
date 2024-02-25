declare namespace _default {
    export { ArgumentParser };
    export { ArgumentError };
    export { ArgumentTypeError };
    export { BooleanOptionalAction };
    export { FileType };
    export { HelpFormatter };
    export { ArgumentDefaultsHelpFormatter };
    export { RawDescriptionHelpFormatter };
    export { RawTextHelpFormatter };
    export { MetavarTypeHelpFormatter };
    export { Namespace };
    export { Action };
    export { ONE_OR_MORE };
    export { OPTIONAL };
    export { PARSER };
    export { REMAINDER };
    export { SUPPRESS };
    export { ZERO_OR_MORE };
}
export default _default;
declare const ArgumentParser: any;
declare function ArgumentError(...args: any[]): any;
declare function ArgumentTypeError(...args: any[]): any;
declare const BooleanOptionalAction: any;
declare function FileType(...args: any[]): any;
declare class HelpFormatter {
    private constructor();
    _Section: (...args: any[]) => any;
}
declare const ArgumentDefaultsHelpFormatter: any;
declare const RawDescriptionHelpFormatter: any;
declare const RawTextHelpFormatter: any;
declare const MetavarTypeHelpFormatter: any;
declare class Namespace {
    private constructor();
}
declare const Action: any;
declare const ONE_OR_MORE: "+";
declare const OPTIONAL: "?";
declare const PARSER: "A...";
declare const REMAINDER: "...";
declare const SUPPRESS: "==SUPPRESS==";
declare const ZERO_OR_MORE: "*";
