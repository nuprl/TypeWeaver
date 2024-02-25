declare namespace _default {
    export { secp128r1 };
    export { secp160k1 };
    export { secp160r1 };
    export { secp192k1 };
    export { secp192r1 };
    export { secp224r1 };
    export { secp256r1 };
}
export default _default;
declare function secp128r1(): X9ECParameters;
declare function secp160k1(): X9ECParameters;
declare function secp160r1(): X9ECParameters;
declare function secp192k1(): X9ECParameters;
declare function secp192r1(): X9ECParameters;
declare function secp224r1(): X9ECParameters;
declare function secp256r1(): X9ECParameters;
declare function X9ECParameters(curve: any, g: any, n: any, h: any): void;
declare class X9ECParameters {
    constructor(curve: any, g: any, n: any, h: any);
    curve: any;
    g: any;
    n: any;
    h: any;
    getCurve: typeof x9getCurve;
    getG: typeof x9getG;
    getN: typeof x9getN;
    getH: typeof x9getH;
}
declare function x9getCurve(): any;
declare function x9getG(): any;
declare function x9getN(): any;
declare function x9getH(): any;
