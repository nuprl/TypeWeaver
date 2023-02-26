declare const handlers: {
    RegExp(path: any, characterClass: any): void;
    Group(path: any, characterClass: any): void;
};
declare function shouldProcess(expression: string, charset: string): any;
