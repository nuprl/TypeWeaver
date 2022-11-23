declare function ECFieldElementFp(q: any, x: any): void;
declare function ECPointFp(curve: any, x: any, y: any, z: any): void;
declare function ECCurveFp(q: any, a: any, b: any): void;
declare const _default: {
    ECCurveFp: typeof ECCurveFp;
    ECPointFp: typeof ECPointFp;
    ECFieldElementFp: typeof ECFieldElementFp;
};
export default _default;
