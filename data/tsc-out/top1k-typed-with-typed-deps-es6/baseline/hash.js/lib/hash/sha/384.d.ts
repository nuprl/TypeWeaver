export default SHA384;
declare function SHA384(): SHA384;
declare class SHA384 {
    h: number[];
    _digest(enc: any): any;
}
declare namespace SHA384 {
    const blockSize: number;
    const outSize: number;
    const hmacStrength: number;
    const padLength: number;
}
