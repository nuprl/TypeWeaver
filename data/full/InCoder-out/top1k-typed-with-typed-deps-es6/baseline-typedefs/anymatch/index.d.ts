declare const anymatch: {
    (matchers: any, testString: any, options?: {
        returnIndex: boolean;
    }): number | boolean | ((testString: any, ri?: boolean) => number | boolean);
    default: any;
};
export default anymatch;
