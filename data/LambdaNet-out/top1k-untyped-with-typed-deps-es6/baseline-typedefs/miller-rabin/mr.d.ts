declare function MillerRabin(rand: string): void;
declare namespace MillerRabin {
    var create: (rand: string) => string;
}
export default MillerRabin;
