export default assert;
declare function assert(val: boolean, msg: string): void;
declare namespace assert {
    var equal: (l: number, r: number, msg: string) => void;
}
