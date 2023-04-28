declare function assert(val: any, msg: string): void;
declare namespace assert {
    var equal: (l: any, r: any, msg: string) => void;
}
