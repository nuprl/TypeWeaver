declare function trimNewlines(string: string | undefined): string;
declare namespace trimNewlines {
    var start: (string: any) => any;
    var end: (string: any) => any;
}
export default trimNewlines;
