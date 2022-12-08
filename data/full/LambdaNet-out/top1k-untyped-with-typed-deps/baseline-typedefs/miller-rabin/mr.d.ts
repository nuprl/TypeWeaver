declare var bn: any[];
declare var brorand: string;
declare function MillerRabin(rand: string): void;
declare namespace MillerRabin {
    var create: (rand: string) => string;
}
