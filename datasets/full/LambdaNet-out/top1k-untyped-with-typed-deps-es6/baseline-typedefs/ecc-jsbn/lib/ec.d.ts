declare function ECFieldElementFp(q: object, x: number): void;
declare function ECPointFp(curve: object, x: number, y: number, z: string): void;
declare function ECCurveFp(q: object, a: Function, b: string): void;
declare const _default: {
    ECCurveFp: typeof ECCurveFp;
    ECPointFp: typeof ECPointFp;
    ECFieldElementFp: typeof ECFieldElementFp;
};
export default _default;
