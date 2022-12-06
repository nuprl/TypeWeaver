export default bufferEq;
declare function bufferEq(a: any[], b: any[]): boolean;
declare namespace bufferEq {
    var install: () => void;
    var restore: () => void;
}
