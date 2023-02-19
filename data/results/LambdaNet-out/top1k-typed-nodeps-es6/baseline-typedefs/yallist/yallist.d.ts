export default Yallist;
declare function Yallist(list: any[]): string;
declare namespace Yallist {
    var Node: (value: string, prev: HTMLElement, next: Function, list: Function) => string;
    var create: typeof Yallist;
}
