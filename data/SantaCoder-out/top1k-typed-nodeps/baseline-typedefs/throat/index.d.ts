declare function throatInternal(size: number): (fn: Function, self: any, args: any[]) => Promise<any>;
declare function earlyBound(size: number, fn: Function): () => Promise<any>;
declare function lateBound(size: number): (fn: Function) => Promise<any>;
declare function Delayed(resolve: Function, fn: Function, self: any, args: any[]): void;
declare var blockSize: number;
declare function Queue(): void;
