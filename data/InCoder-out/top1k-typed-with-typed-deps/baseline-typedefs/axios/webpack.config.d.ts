declare const TerserPlugin: any;
declare var webpack: any;
declare var config: {};
declare function generateConfig(name: string): {
    entry: string;
    output: {
        path: string;
        filename: string;
        sourceMapFilename: string;
        library: string;
        libraryTarget: string;
        globalObject: string;
    };
    node: boolean;
    devtool: string;
    mode: string;
};
