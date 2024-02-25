export default MillerRabin;
declare function MillerRabin(rand: any): void;
declare class MillerRabin {
    constructor(rand: any);
    rand: any;
    _randbelow(n: any): bn;
    _randrange(start: any, stop: any): any;
    test(n: any, k: any, cb: any): boolean;
    getDivisor(n: any, k: any): any;
}
declare namespace MillerRabin {
    function create(rand: any): MillerRabin;
}
import bn from "bn.js";
