declare function MillerRabin(rand: number): void;
declare namespace MillerRabin {
    var create: (rand: Rand) => any;
}
export default MillerRabin;
