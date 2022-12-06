export default assert;
declare function assert(val: any, msg: string): void;
declare namespace assert {
    var equal: (l: any, r: string, msg: string) => void;
}
