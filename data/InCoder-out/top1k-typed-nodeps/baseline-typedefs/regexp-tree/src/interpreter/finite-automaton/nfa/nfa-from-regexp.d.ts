declare const parser: any;
declare const alt: any, char: any, or: any, rep: any, plusRep: any, questionRep: any;
declare const generator: {
    RegExp(node: any): any;
    Alternative(node: any): ST;
    Disjunction(node: any): xpression;
    Repetition(node: any): any;
    Char(node: any): any;
    Group(node: any): any;
};
