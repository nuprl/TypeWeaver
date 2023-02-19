declare const ESC = "\u001B";
declare const CSI: string;
declare const beep = "\u0007";
declare const cursor: {
    to(x: any, y: any): string;
    move(x: any, y: any): string;
    up: (count?: number) => string;
    down: (count?: number) => string;
    forward: (count?: number) => string;
    backward: (count?: number) => string;
    nextLine: (count?: number) => string;
    prevLine: (count?: number) => string;
    left: string;
    hide: string;
    show: string;
    save: string;
    restore: string;
};
declare const scroll: {
    up: (count?: number) => string;
    down: (count?: number) => string;
};
declare const erase: {
    screen: string;
    up: (count?: number) => string;
    down: (count?: number) => string;
    line: string;
    lineEnd: string;
    lineStart: string;
    lines(count: any): string;
};
declare const clear: {
    screen: string;
};
