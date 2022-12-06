export default bufferEq;
declare function bufferEq(a: any, b: any): any;
declare namespace bufferEq {
    var install: () => void;
    var restore: () => void;
}
