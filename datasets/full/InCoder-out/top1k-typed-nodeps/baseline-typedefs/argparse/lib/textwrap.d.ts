declare const wordsep_simple_re: RegExp;
declare class TextWrapper {
    constructor(options?: {});
    _munge_whitespace(text: any): any;
    _split(text: any): any;
    _handle_long_word(reversed_chunks: any, cur_line: any, cur_len: any, width: any): void;
    _wrap_chunks(chunks: any): any[];
    _split_chunks(text: any): any;
    wrap(text: any): any[];
    fill(text: any): string;
}
declare function wrap(text: string | string[], options: {}, WrapOptions: any): any[];
declare function fill(text: string | string[], options: {}, FillOptions: any): string;
declare let _whitespace_only_re: RegExp;
declare let _leading_whitespace_re: RegExp;
declare function dedent(text: string | null | undefined): string;
