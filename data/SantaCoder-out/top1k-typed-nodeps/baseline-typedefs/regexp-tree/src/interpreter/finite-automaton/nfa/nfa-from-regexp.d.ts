declare const parser: any;
declare const alt: any, char: any, or: any, rep: any, plusRep: any, questionRep: any;
declare const generator: {
    RegExp(node: any): any;
    Alternative(node: any): NFAFragment;
    Disjunction(node: any): NFAState;
    Repetition(node: any): Fragment;
    Char(node: any): any;
    Group(node: any): any;
};
