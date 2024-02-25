export = vary;
declare function vary(res: any, field: string | any[]): void;
declare namespace vary {
    export { append };
}
declare function append(header: string, field: string | any[]): string;
