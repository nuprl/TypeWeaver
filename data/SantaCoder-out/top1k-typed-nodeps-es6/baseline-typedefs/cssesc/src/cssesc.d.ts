declare const cssesc: {
    (string: any, options: any): string;
    options: {
        escapeEverything: boolean;
        isIdentifier: boolean;
        quotes: string;
        wrap: boolean;
    };
    version: string;
};
export default cssesc;
