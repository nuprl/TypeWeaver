declare var net: any;
declare var EE: any;
declare var util: any;
declare var childProcess: any;
declare var bser: any;
declare var unilateralTags: string[];
declare function Client(options: any): void;
declare var cap_versions: {
    "cmd-watch-del-all": string;
    "cmd-watch-project": string;
    relative_root: string;
    "term-dirname": string;
    "term-idirname": string;
    wildmatch: string;
};
declare function vers_compare(a: string, b: string): number;
declare function have_cap(vers: string, name: string): boolean;
