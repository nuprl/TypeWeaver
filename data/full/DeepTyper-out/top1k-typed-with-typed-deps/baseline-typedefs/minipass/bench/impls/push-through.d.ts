declare class PushThrough {
    constructor(opt: any);
    on(ev: any, fn: any): void;
    once(ev: any, fn: any): void;
    emit(ev: any): void;
    pipe(dest: any): void;
    resume(): void;
    pause(): void;
    write(chunk: any): boolean;
    end(): void;
}
