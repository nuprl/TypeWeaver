declare const scan: (input: any, options: any) => {
    prefix: string;
    input: any;
    start: number;
    base: any;
    glob: string;
    isBrace: boolean;
    isBracket: boolean;
    isGlob: boolean;
    isExtglob: boolean;
    isGlobstar: boolean;
    negated: boolean;
    negatedExtglob: boolean;
};
export default scan;
