declare const N: number;
declare const fs: any;
declare const impls: string[];
declare const promiseSpawn: any;
declare const main: Promise<void>;
declare const cases: string[];
declare const pipeLen: number[];
declare const EE: any;
declare const setupPipeline: void;
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
