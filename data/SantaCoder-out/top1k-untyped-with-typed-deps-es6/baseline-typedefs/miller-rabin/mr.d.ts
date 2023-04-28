import brorand from 'brorand';
declare function MillerRabin(rand: brorand.Rand): void;
declare namespace MillerRabin {
    var create: (rand: Random) => any;
}
export default MillerRabin;
