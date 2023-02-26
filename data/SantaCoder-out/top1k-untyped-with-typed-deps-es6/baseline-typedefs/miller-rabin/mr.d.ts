declare function MillerRabin(rand: number): void;
declare namespace MillerRabin {
    var create: (rand: number) => any;
}
export default MillerRabin;
