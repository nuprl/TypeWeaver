declare function assert(val: boolean, msg: string): void;
declare namespace assert {
    var equal: (l: any, r: any, msg: string) => void;
}
