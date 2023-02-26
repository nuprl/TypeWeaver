declare const path: any;
declare const fs: any;
declare const doWrite: boolean;
declare const allFiles: Set<unknown>;
declare const findFiles: (p: any) => void;
declare let canUpdateWithWrite: boolean;
declare const sortImport: (a: any, b: any) => 0 | 1 | -1;
declare const execToArray: (content: any, regexp: any) => any[];
declare const schema: ({
    title: string;
    regexp: RegExp;
    updateMessage: string;
    update(content: any, author: any): string;
    optional?: undefined;
    repeat?: undefined;
} | {
    title: string;
    regexp: RegExp;
    updateMessage?: undefined;
    optional?: undefined;
    repeat?: undefined;
} | {
    title: string;
    regexp: RegExp;
    updateMessage: string;
    update(content: any): string;
    optional: boolean;
    repeat: boolean;
})[];
