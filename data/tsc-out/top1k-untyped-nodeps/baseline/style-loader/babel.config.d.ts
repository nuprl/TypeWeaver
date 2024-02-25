declare function _exports(api: any): {
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
export = _exports;
