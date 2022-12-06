declare const parse: (input: any, options?: {}) => {
    type: string;
    input: string;
    nodes: any[];
};
export default parse;
