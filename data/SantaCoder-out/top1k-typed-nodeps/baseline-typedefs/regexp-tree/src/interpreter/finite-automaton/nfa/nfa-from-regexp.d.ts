declare const parser: any;
declare const alt: any, char: any, or: any, rep: any, plusRep: any, questionRep: any;
declare const generator: {
    RegExp(node: any): any;
    Alternative(node: any): string;
    Disjunction(node: any): Function;
    Repetition(node: any): string;
    Char(node: any): any;
    Group(node: any): any;
};
