declare function secp128r1(): string;
declare function secp160k1(): string;
declare function secp160r1(): string;
declare function secp192k1(): string;
declare function secp192r1(): string;
declare function secp224r1(): string;
declare function secp256r1(): string;
declare const _default: {
    secp128r1: typeof secp128r1;
    secp160k1: typeof secp160k1;
    secp160r1: typeof secp160r1;
    secp192k1: typeof secp192k1;
    secp192r1: typeof secp192r1;
    secp224r1: typeof secp224r1;
    secp256r1: typeof secp256r1;
};
export default _default;
