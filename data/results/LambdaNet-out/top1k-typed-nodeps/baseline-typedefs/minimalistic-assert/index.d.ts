declare function assert(val: boolean, msg: number): void;
declare namespace assert {
    var equal: (l: number, r: number, msg: number) => void;
}
