declare var bn: any;
declare var brorand: any;
declare function MillerRabin(rand: number): void;
declare namespace MillerRabin {
    var create: (rand: Rand) => any;
}
