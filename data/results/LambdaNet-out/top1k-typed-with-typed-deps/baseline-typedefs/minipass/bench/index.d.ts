declare const N: number;
declare const fs: string;
declare const impls: any[];
declare const promiseSpawn: Function;
declare const main: Function;
declare const cases: any[];
declare const pipeLen: any[];
declare const EE: string;
declare const setupPipeline: Function;
declare class Src extends EE {
    constructor(options: any);
    pipe(dest: any): any;
    pause(): void;
}
declare class FastSrc extends Src {
    resume(): void;
}
declare class SlowSrc extends Src {
    resume(): void;
}
declare class Dest extends EE {
    constructor();
}
declare class FastDest extends Dest {
    write(c: any): boolean;
    end(): any;
}
declare class SlowDest extends Dest {
    write(c: any): boolean;
    end(): this;
}
