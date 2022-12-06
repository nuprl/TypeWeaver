declare const _default: {
    cursor: {
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
    scroll: {
        up: (count?: number) => string;
        down: (count?: number) => string;
    };
    erase: {
        screen: string;
        up: (count?: number) => string;
        down: (count?: number) => string;
        line: string;
        lineEnd: string;
        lineStart: string;
        lines(count: any): string;
    };
    beep: string;
    clear: {
        screen: string;
    };
};
export default _default;
