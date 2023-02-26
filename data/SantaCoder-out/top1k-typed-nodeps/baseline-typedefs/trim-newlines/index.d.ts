declare function trimNewlines(string: string): string;
declare namespace trimNewlines {
    var start: (string: any) => any;
    var end: (string: any) => any;
}
export default trimNewlines;
