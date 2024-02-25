export default ProgressBar;
declare function ProgressBar(fmt: string, options: object | number): void;
declare class ProgressBar {
    constructor(fmt: string, options: object | number);
    stream: any;
    fmt: string;
    curr: any;
    total: any;
    width: any;
    clear: any;
    chars: {
        complete: any;
        incomplete: any;
        head: any;
    };
    renderThrottle: any;
    lastRender: number;
    callback: any;
    tokens: {};
    lastDraw: string;
    tick(len: number | object, tokens: object): void;
    start: Date;
    complete: boolean;
    render(tokens: object, force: any): void;
    update(ratio: number, tokens: any): void;
    interrupt(message: string): void;
    terminate(): void;
}
