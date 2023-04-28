declare var fs: any;
declare var path: any;
declare var Iconv: any;
declare var Buffer: any;
declare var destFileName: string;
declare var encodingFamilies: ({
    encodings: number[];
    convert: (i: number) => {
        name: string;
        aliases: (string | number)[];
    };
} | {
    encodings: string[];
    convert?: undefined;
})[];
declare var encodings: {};
declare function generateCharsString(encoding: string): string;
