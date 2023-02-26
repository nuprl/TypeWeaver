declare const assert: any;
declare const resolve: any;
declare const Suite: any;
declare const sync: any;
declare const escalade: any;
declare const findup: any;
declare const fixtures: any;
declare const file: any;
declare const filter: (name: any) => (dir: any, files: any) => any;
declare const contenders: {
    'find-up': (x: any) => any;
    escalade: (x: any) => any;
    'find-up.sync': (x: any) => any;
    'escalade/sync': (x: any) => any;
};
declare function pad(str: string): string;
declare function runner(target: string, expects: string[]): Promise<unknown>;
