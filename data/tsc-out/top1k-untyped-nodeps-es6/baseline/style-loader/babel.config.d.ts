declare function _default(api: any): {
    presets: (string | {
        targets: {
            node: string;
        };
    })[][];
    overrides: {
        test: string;
        presets: (string | {
            targets: {
                node: string;
            };
        })[][];
    }[];
};
export default _default;
